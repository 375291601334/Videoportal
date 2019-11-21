import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromCourses from '../../../store/reducers/courses';
import * as CoursesActions from '../../../store/actions/courses';

import { ICourse, Course } from '../../models/course.model';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.page.html',
  styleUrls: ['./new-course.page.scss'],
})
export class NewCoursePageComponent {
  newCourseProps: ICourse = {
    id: '',
    title: '',
    date: new Date(),
    description: '',
    duration: null,
    topRated: false,
    authors: [],
  };

  constructor(
    private route: Router,
    private store: Store<fromCourses.State>,
  ) {}

  addNewCourse() {
    const newCourse = new Course(
      '',
      this.newCourseProps.title,
      this.newCourseProps.date,
      this.newCourseProps.description,
      this.newCourseProps.duration,
      false,
      this.newCourseProps.authors,
    );

    this.store.dispatch(CoursesActions.AddNewCourse({ course: newCourse }));
    this.route.navigate(['']);
  }

  onCancel() {
    this.route.navigate(['']);
  }
}
