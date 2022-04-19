import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DropdownDirective } from './directives/dropdown.directive';
import { CollapseDirective } from './directives/collapse.directive';
import { PlaceholderDirective } from './directives/placeholder.directive';

import { SafePipe } from './pipes/safe.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    DropdownDirective,
    CollapseDirective,
    PlaceholderDirective,
    SafePipe,
    FilterPipe,
    ShortenPipe,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    DropdownDirective,
    CollapseDirective,
    PlaceholderDirective,
    SafePipe,
    FilterPipe,
    ShortenPipe
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule { }
