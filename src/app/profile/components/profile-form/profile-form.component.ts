import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  isLoading:boolean = false;
  validError:boolean = false;
  validMessage:string = '';
  profileForm:FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.maxLength(65), Validators.minLength(1)]),
      'lastName': new FormControl(null, [Validators.required, Validators.maxLength(65), Validators.minLength(1)]),
      'address': new FormControl(null, [Validators.required, Validators.maxLength(120), Validators.minLength(4)]),
      'city': new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(4)]),
      'zip': new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern('^(((\\+31|0|0031)6){1}[1-9]{1}[0-9]{7})$')])
    });
  }

  onSaveProfile(): void {
    if(this.profileForm.valid) {
      this.isLoading = true;
      this.validError = false;

      this.profileForm.reset();

      return;
    }
    this.isLoading = false;
    this.validError = true;
    this.validMessage = 'Unable to submit the form. The form is not valid!';
  }

  controlValidationFeedback(control: string): boolean {
    const formControl = this.profileForm.get(control);
    return (!formControl?.valid && formControl?.touched)!;
  }

  errorValidationFeedback(control: string, error: string): boolean | undefined {
    const formControl = this.profileForm.get(control);
    return formControl?.hasError(error);
  }

}
