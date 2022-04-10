import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

@NgModule({
    declarations: [
        AdminPanelComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }