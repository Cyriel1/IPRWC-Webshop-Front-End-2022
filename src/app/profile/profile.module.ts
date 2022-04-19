import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileFormComponent } from './components/profile-form/profile-form.component';

@NgModule({
  declarations: [
    ProfileFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }