import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ProfileService } from './profile.service';

import { Profile } from '../models/profile.model';

@Injectable()
export class ProfileStorageService {

  constructor(
    private http: HttpClient,
    private profileService: ProfileService) { }

  saveProfile(userId: number, profile: Profile): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      environment.serverDomain() + environment.shopPath + '/user-profile',
      {
        userId: userId,
        userProfile: profile
      },
      {
        responseType: 'json'
      }
    ).pipe(catchError(
      (err) => {
        console.error(`could not save user profile ${err.status}, body was: ${err.error}`);

        return throwError(() => err);
      }
    ));
  }

  updateProfile(userId: number, profileId: number, profile: Profile): Observable<{ message: string }> {
    profile.id = profileId;

    return this.http.put<{ message: string }>(
      environment.serverDomain() + environment.shopPath + '/user-profile',
      {
        userId: userId,
        userProfile: profile
      },
      {
        responseType: 'json'
      }
    ).pipe(catchError(
      (err) => {
        console.error(`could not update user profile ${err.status}, body was: ${err.error}`);

        return throwError(() => err);
      }
    ));
  }

  fetchProfile(userId: number): Observable<Profile | null> {
    return this.http.get<Profile>(
      environment.serverDomain() + environment.shopPath + `/user-profile/${userId}`,
      {
        responseType: 'json'
      }
    ).pipe(tap((responseData) => {
      this.profileService.setProfile(new Profile(
        responseData.id,
        responseData.firstName,
        responseData.lastName,
        responseData.address,
        responseData.zip,
        responseData.city,
        responseData.phoneNumber));
    }),
      catchError(
        (err) => {
          this.profileService.setProfile(null!);

          return of(null);
        }
      ));
  }
}
