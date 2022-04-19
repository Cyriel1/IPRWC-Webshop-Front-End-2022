import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    ProductDetailComponent,
    CartButtonComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ShopRoutingModule,
  ],
  entryComponents: [ProductDetailComponent]
})
export class ShopModule { }