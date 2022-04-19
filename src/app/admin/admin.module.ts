import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ProductItemEditComponent } from './components/product-item-edit/product-item-edit.component';
import { ProductDetailEditComponent } from './components/product-detail-edit/product-detail-edit.component';

@NgModule({
    declarations: [
        AdminPanelComponent,
        ProductItemEditComponent,
        ProductDetailEditComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }