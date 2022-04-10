import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, catchError, map, Observable, Subject, Subscription, throwError } from "rxjs";

import { AuthResponse } from "../models/payload/auth-repsonse.model";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

@Injectable()
export class AuthService {
  validEmail!: Subject<boolean>;
  validUsername!: Subject<boolean>;
  tokenExpirationTimer: any;

  jwtHelper: JwtHelperService = new JwtHelperService();
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null!);

  constructor(private router: Router) { }

  autoLogin(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    const isAccessTokenExpired: boolean = this.jwtHelper.isTokenExpired(accessToken);
    const decodeToken: Token = this.jwtHelper.decodeToken(accessToken);
    const loadedUser: User = new User(
      decodeToken.email,
      decodeToken.sub,
      decodeToken.roles,
      accessToken,
      isAccessTokenExpired
    );

    if (loadedUser.accessToken) {
      this.user.next(loadedUser);
      const experationDuration = (decodeToken.exp * 1000) - Date.now();
      this.autoLogout(experationDuration);
    }
  }

  logout() {
    this.user.next(null!);
    this.router.navigate(['/login']);
    localStorage.removeItem('accessToken');
    sessionStorage.clear();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(experationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, experationDuration);
  }

  handleAuthentication(userResponse: AuthResponse): void {
    const accessToken = userResponse.accessToken;
    const isAccessTokenExpired: boolean = this.jwtHelper.isTokenExpired(accessToken);
    const decodeToken: Token = this.jwtHelper.decodeToken(accessToken);

    const user = new User(
      decodeToken.email,
      decodeToken.sub,
      decodeToken.roles,
      accessToken,
      isAccessTokenExpired
    );
    this.user.next(user);
    const experationDuration = (decodeToken.exp * 1000) - Date.now();
    this.autoLogout(experationDuration);
    localStorage.setItem('accessToken', accessToken);
  }

  validateEmail(): Promise<any> | Observable<any> {
    return new Promise((resolve) => {
      this.validEmail.subscribe({
        next: (valid) => {
          if (valid) resolve({ 'emailExist': valid });
          return resolve(null);
        }
      });
    });
  }

  validateUsername(): Promise<any> | Observable<any> {
    return new Promise((resolve) => {
      this.validUsername.subscribe({
        next: (valid) => {
          if (valid) resolve({ 'usernameExist': valid });
          return resolve(null);
        }
      });
    });
  }
}
