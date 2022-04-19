import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";

import { environment } from "src/environments/environment";

import { AuthService } from "./auth.service";

import { AuthResponse } from "../models/payload/auth-repsonse.model";
import { AuthRequest } from "../models/payload/auth-request.model";

@Injectable()
export class AuthStorageService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    login(credentials: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            environment.serverDomain() + environment.authPath + '/login',
            credentials,
            {
                responseType: 'json'
            }
        ).pipe(catchError(
            (err) => {
                console.error(`could not authenticate user ${err.status}, body was: ${err.error}`);

                return throwError(() => err);
            }
        ),
            tap(
                (responseData) => {
                    this.authService.handleAuthentication(responseData);
                }
            ));
    }

    signUp(credentials: AuthRequest): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(
            environment.serverDomain() + environment.authPath + '/register',
            credentials,
            {
                responseType: 'json'
            },
        ).pipe(catchError(
            (err) => {
                console.error(`could not register user ${err.status}, body was: ${err.error}`);

                return throwError(() => err);
            }
        ),
            tap(() => {
                this.login(credentials);
            }
            ));
    }

    validateUsername(username: string): void {
        this.http.get<boolean>(
            environment.serverDomain() + environment.authPath + `/validate/username/${username}`,
            {
                responseType: 'json'
            }
        ).subscribe({
            next: (responseData) => {
                this.authService.validUsername.next(responseData);
            },
            error: (err) => {
                console.error(`could not validate username ${err.status}, body was: ${err.error}`);
                this.authService.validUsername.next(false);
            }
        });
    }

    validateEmail(email: string): void {
        this.http.get<boolean>(
            environment.serverDomain() + environment.authPath + `/validate/email/${email}`,
            {
                responseType: 'json'
            }
        ).subscribe({
            next: (responseData) => {
                this.authService.validEmail.next(responseData);
            },
            error: (err) => {
                console.error(`could not validate email ${err.status}, body was: ${err.error}`);
                this.authService.validEmail.next(false);
            }
        });
    }
}