import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { DurationInputComponent } from '../../../shared/components/duration-input/duration-input.component';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { DateInputComponent } from '../../../shared/components/date-input/date-input.component';

import * as fromCourses from '../../../store/reducers/courses';
import * as CoursesActions from '../../../store/actions/courses';

import { ICourse, Course } from '../../models/course.model';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.page.html',
  styleUrls: ['./new-course.page.scss'],
})
export class NewCoursePageComponent {
  @ViewChild('duration', { static: true }) durationElement: DurationInputComponent;
  @ViewChild('authors', { static: true }) authorsElement: MultiSelectComponent;
  @ViewChild('date', { static: true }) dateElement: DateInputComponent;

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
      this.dateElement.date,
      this.newCourseProps.description,
      this.durationElement.duration,
      false,
      this.authorsElement.authors.split(','),
    );
    console.log(newCourse);

    this.store.dispatch(CoursesActions.AddNewCourse({ course: newCourse }));
    this.route.navigate(['']);
  }

  onCancel() {
    this.route.navigate(['']);
  }
}
