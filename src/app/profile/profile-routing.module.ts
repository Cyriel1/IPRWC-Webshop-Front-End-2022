import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileFormComponent } from './components/profile-form/profile-form.component';

import { ProfileResolverService } from './services/resolvers/profile-resolver.service';

import { AuthGuard } from '../auth/services/guards/auth-gaurd.service';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileFormComponent,
    resolve: [ProfileResolverService],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
