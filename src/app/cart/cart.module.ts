import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

import { CartAmountComponent } from './components/cart-amount/cart-amount.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartListComponent } from './components/cart-list/cart-list.component';

@NgModule({
    declarations: [
        CartAmountComponent,
        CartItemComponent,
        CartListComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        CartRoutingModule
    ]
})
export class CartModule { }