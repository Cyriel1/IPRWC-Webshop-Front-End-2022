import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';

import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderPaymentComponent } from './components/order-payment/order-payment.component';

@NgModule({
    declarations: [
        OrderListComponent,
        OrderItemComponent,
        OrderPaymentComponent
    ],
    imports: [
        SharedModule,
        OrderRoutingModule
    ]
})
export class OrderModule { }