import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileResolverService } from '../profile/services/resolvers/profile-resolver.service';

import { CartListComponent } from './components/cart-list/cart-list.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartListComponent,
    resolve: [ProfileResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
