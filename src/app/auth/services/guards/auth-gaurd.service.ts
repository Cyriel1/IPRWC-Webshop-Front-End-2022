import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {

    return this.authService.user.pipe(
      take(1), map((user) => {
        const url = state.url;
        const isAuth = !!user;

        if (isAuth) {
          const isAdmin = user.roles.includes('ROLE_ADMIN');
          if (url === '/admin' && !isAdmin)
            return this.router.createUrlTree(['/shop']);

          return true;
        }
        return this.router.createUrlTree(['/shop']);
      })
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.canActivate(route, state);
  }
}
