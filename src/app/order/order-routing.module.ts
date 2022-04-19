import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListComponent } from './components/order-list/order-list.component';

import { OrderResolverService } from './services/resolvers/order-resolver.service';
import { ProfileResolverService } from '../profile/services/resolvers/profile-resolver.service';

import { AuthGuard } from '../auth/services/guards/auth-gaurd.service';

const routes: Routes = [
  {
    path: 'orders',
    component: OrderListComponent,
    resolve: [OrderResolverService, ProfileResolverService],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
