import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { MultiSelectComponent } from '../shared/components/multi-select/multi-select.component';
import { DateInputComponent } from '../shared/components/date-input/date-input.component';
import { DurationInputComponent } from '../shared/components/duration-input/duration-input.component';

// Pipes
import { TimePipe } from './pipes/time/time.pipe';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';

@NgModule({
  declarations: [
    SearchBarComponent,
    BreadcrumbsComponent,
    MultiSelectComponent,
    DateInputComponent,
    DurationInputComponent,
    TimePipe,
    FilterPipe,
    OrderByPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    FilterPipe,
    OrderByPipe,
  ],
  exports: [
    SearchBarComponent,
    BreadcrumbsComponent,
    MultiSelectComponent,
    DateInputComponent,
    DurationInputComponent,
    TimePipe,
    FilterPipe,
    OrderByPipe,
  ],
})
export class SharedModule { }
