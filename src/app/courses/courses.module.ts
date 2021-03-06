import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { CoursesPageComponent } from './pages/courses/courses.page';
import { CourseFormPageComponent } from './pages/course-form/course-form.page';

import { CourseCardComponent } from './components/course-card/course-card.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';

import { CoursesService } from './services/courses/courses.service';

import { StartDateDirective } from './directives/start-date/start-date.directive';

@NgModule({
  declarations: [
    CourseCardComponent,
    CoursesListComponent,
    CoursesPageComponent,
    StartDateDirective,
    CourseFormPageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    CoursesPageComponent,
  ],
  providers: [
    CoursesService,
  ],
})
export class CoursesModule { }
