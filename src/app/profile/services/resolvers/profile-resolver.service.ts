import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfileStorageService } from '../profile-storage.service';

import { Profile } from '../../models/profile.model';

@Injectable()
export class ProfileResolverService implements Resolve<Profile | null> {
    userId: number = 0;
    userSub: Subscription = new Subscription();

    constructor(
        private authService: AuthService,
        private profileStorageService: ProfileStorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Profile | null | Observable<Profile | null> {
        this.userSub = this.authService.user.subscribe((user) => {
            if (!!user) this.userId = user.id;
            this.userSub.unsubscribe();
        });

        return this.profileStorageService.fetchProfile(this.userId);
    }
}
