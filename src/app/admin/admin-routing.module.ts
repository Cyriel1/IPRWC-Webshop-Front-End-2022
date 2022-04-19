import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductResolverService } from '../shop/services/resolvers/product-resolver.service';
import { ProductsResolverService } from '../shop/services/resolvers/products-resolver.service';

import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ProductDetailEditComponent } from './components/product-detail-edit/product-detail-edit.component';

import { AuthGuard } from '../auth/services/guards/auth-gaurd.service';
import { CanDeactivateGuard } from '../auth/services/guards/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    resolve: [ProductsResolverService]
  },
  {
    path: 'admin/product/new',
    component: ProductDetailEditComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'admin/product/:id',
    component: ProductDetailEditComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    resolve: [ProductResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
