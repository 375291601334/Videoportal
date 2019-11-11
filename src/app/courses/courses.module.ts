import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchModule } from '../search/search.module';

import { CoursesPageComponent } from './pages/courses/courses.page';

import { CourseCardComponent } from './components/course-card/course-card.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';

import { TimePipe } from './pipes/time/time.pipe';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';

import { StartDateDirective } from './directives/start-date.directive';

@NgModule({
  declarations: [
    CourseCardComponent,
    CoursesListComponent,
    CoursesPageComponent,
    TimePipe,
    FilterPipe,
    StartDateDirective,
    OrderByPipe,
  ],
  imports: [
    CommonModule,
    SearchModule,
    FormsModule,
  ],
  exports: [
    CoursesPageComponent,
  ],
  providers: [
    FilterPipe,
    OrderByPipe,
  ],
})
export class CoursesModule { }
