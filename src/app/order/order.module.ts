import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderItemComponent } from './components/order-item/order-item.component';

@NgModule({
    declarations: [
        OrderListComponent,
        OrderItemComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        OrderRoutingModule
    ]
})
export class OrderModule { }