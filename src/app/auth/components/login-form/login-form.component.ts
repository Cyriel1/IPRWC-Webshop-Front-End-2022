import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthStorageService } from '../../services/auth-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  validError: boolean = false;
  validMessage: string = '';
  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private authStorageService: AuthStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(120), Validators.minLength(6)])
    });
  }

  onSignIn(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.validError = false;
      this.authStorageService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/shop']);
        },
        error: () => {
          this.validMessage = 'Unable to submit the form, credentials are incorrect!';
          this.isLoading = false;
          this.validError = true;
        }
      });
      this.loginForm.reset();

      return;
    }
    this.validError = true;
    this.validMessage = 'Unable to submit the form. The form is not valid!';
  }

  controlValidationFeedback(control: string): boolean {
    const formControl = this.loginForm.get(control);
    return (!formControl?.valid && formControl?.touched)!;
  }

  errorValidationFeedback(control: string, error: string): boolean | undefined {
    const formControl = this.loginForm.get(control);
    return formControl?.hasError(error);
  }
}
