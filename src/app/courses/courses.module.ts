import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { CoursesPageComponent } from './pages/courses/courses.page';
import { NewCoursePageComponent } from './pages/new-course/new-course.page';

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
    NewCoursePageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
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
