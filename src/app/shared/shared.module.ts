import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './directives/dropdown.directive';
import { CollapseDirective } from './directives/collapse.directive';
import { PlaceholderDirective } from './directives/placeholder.directive';

import { ShortenPipe } from './pipes/shorten.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    DropdownDirective,
    CollapseDirective,
    PlaceholderDirective,
    ShortenPipe,
    FilterPipe,
    LoadingSpinnerComponent
  ],
  imports: [
      CommonModule
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    DropdownDirective,
    CollapseDirective,
    PlaceholderDirective,
    ShortenPipe,
    FilterPipe
  ]
})
export class SharedModule {}
