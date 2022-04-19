import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductResolverService } from './services/resolvers/product-resolver.service';
import { ProductsResolverService } from './services/resolvers/products-resolver.service';

const routes: Routes = [
  {
    path: 'shop',
    component: ProductListComponent,
    resolve: [ProductsResolverService]
  },
  {
    path: 'shop/:id',
    component: ProductListComponent,
    resolve: [ProductsResolverService, ProductResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
