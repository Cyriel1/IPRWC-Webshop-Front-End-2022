import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observer, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { ProfileStorageService } from '../../services/profile-storage.service';

import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  userId: number = 0;
  existingProfile: Profile = null!;
  profileForm: FormGroup = new FormGroup({});

  isLoading: boolean = false;
  validError: boolean = false;
  validSuccess: boolean = false;
  validMessage: string = '';

  userSub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private profileStorageService: ProfileStorageService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => { if (!!user) this.userId = user.id });
    this.existingProfile = this.profileService.getProfile();
    this.profileForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.maxLength(65), Validators.minLength(1)]),
      'lastName': new FormControl(null, [Validators.required, Validators.maxLength(65), Validators.minLength(1)]),
      'address': new FormControl(null, [Validators.required, Validators.maxLength(120), Validators.minLength(4)]),
      'city': new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
      'zip': new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern('^(((\\+31|0|0031)6){1}[1-9]{1}[0-9]{7})$')])
    });
    this.loadExistingProfile();
  }

  loadExistingProfile(): void {
    if (this.existingProfile) {
      this.profileForm.patchValue({
        firstName: this.existingProfile.firstName,
        lastName: this.existingProfile.lastName,
        address: this.existingProfile.address,
        city: this.existingProfile.city,
        zip: this.existingProfile.zip,
        phoneNumber: this.existingProfile.phoneNumber
      });
    }
  }

  onSaveProfile(): void {
    if (this.profileForm.valid && this.userId != 0) {
      this.isLoading = true;
      this.validError = false;
      this.validSuccess = false;

      if (this.profileService.getProfile()) {
        this.profileStorageService.updateProfile(this.userId, this.existingProfile.id, this.profileForm.value).subscribe(
          this.handleSaveProfileFeedback("Changes has been succesfully saved!", 'Unable to submit the form, user profile has not been updated!')
        );
      } else {
        this.profileStorageService.saveProfile(this.userId, this.profileForm.value).subscribe(
          this.handleSaveProfileFeedback("User profile has been added to your account!", 'Unable to submit the form, user profile has not been added!')
        );
      }

      return;
    }
    this.isLoading = false;
    this.validError = true;
    this.validMessage = 'Unable to submit the form. The form is not valid!';
  }

  handleSaveProfileFeedback(succesMessage: string, errorMessage: string): Partial<Observer<{ message: string; }>> | undefined {
    return {
      next: () => {
        this.isLoading = false;
        this.validSuccess = true;
        this.validMessage = succesMessage;
      },
      error: () => {
        this.validMessage = errorMessage;
        this.isLoading = false;
        this.validError = true;
      }
    };
  }

  controlValidationFeedback(control: string): boolean {
    const formControl = this.profileForm.get(control);
    return (!formControl?.valid && formControl?.touched)!;
  }

  errorValidationFeedback(control: string, error: string): boolean | undefined {
    const formControl = this.profileForm.get(control);
    return formControl?.hasError(error);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
