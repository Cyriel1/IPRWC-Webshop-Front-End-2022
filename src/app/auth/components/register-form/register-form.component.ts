import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { AuthStorageService } from '../../services/auth-storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  validError: boolean = false;
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private authStorageService: AuthStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.validEmail = new Subject<boolean>();
    this.authService.validUsername = new Subject<boolean>();
    this.registerForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)], <AsyncValidatorFn>this.validateEmail.bind(this)),
      'username': new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)], <AsyncValidatorFn>this.validateUsername.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(120), Validators.minLength(6)])
    });
  }

  onSignUp(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.validError = false;
      this.authStorageService.signUp(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/shop']);
        },
        error: () => {
          this.isLoading = false;
          this.validError = true;
        }
      });
      this.registerForm.reset();

      return;
    }
    this.validError = true;
  }

  controlValidationFeedback(control: string): boolean {
    const formControl = this.registerForm.get(control);
    return (!formControl?.valid && formControl?.touched && (formControl.status != 'PENDING'))!;
  }

  errorValidationFeedback(control: string, error: string): boolean | undefined {
    const formControl = this.registerForm.get(control);
    return formControl?.hasError(error);
  }

  validateEmail(control: FormControl): Promise<any> | Observable<any> {
    this.authStorageService.validateEmail(control.value);
    return this.authService.validateEmail();
  }

  validateUsername(control: FormControl): Promise<any> | Observable<any> {
    this.authStorageService.validateUsername(control.value);
    return this.authService.validateUsername();
  }

  ngOnDestroy(): void {
    this.authService.validEmail.unsubscribe();
    this.authService.validUsername.unsubscribe();
  }

}