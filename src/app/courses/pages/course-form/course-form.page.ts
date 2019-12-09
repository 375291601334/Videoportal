import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { DurationInputComponent } from '../../../shared/components/duration-input/duration-input.component';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { DateInputComponent } from '../../../shared/components/date-input/date-input.component';

import * as fromCourses from '../../../store/reducers/courses';
import * as CoursesActions from '../../../store/actions/courses';

import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.page.html',
  styleUrls: ['./course-form.page.scss'],
})
export class CourseFormPageComponent implements OnInit {
  @ViewChild('duration', { static: true }) durationElement: DurationInputComponent;
  @ViewChild('authors', { static: true }) authorsElement: MultiSelectComponent;
  @ViewChild('date', { static: true }) dateElement: DateInputComponent;

  pageTitle: string;
  breadcrumbs = [{text: 'Courses', url: '/courses'}, {text: 'New', url: ''}];
  title = '';
  description = '';
  authorsOptions: { id: string, name: string }[];

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromCourses.State>,
  ) {}

  ngOnInit() {
    this.store.dispatch(CoursesActions.FetchAuthors());
    this.store.pipe(select(fromCourses.getAuthors)).subscribe(
      authors => this.authorsOptions = authors,
    );

    this.pageTitle = this.activatedRoute.snapshot.data.title;

    if (this.pageTitle === 'Edit course') {
      const courseId = this.activatedRoute.snapshot.params.id;

      this.store.dispatch(CoursesActions.FetchCourse({ id: courseId }));

      this.store.pipe(select(fromCourses.getCourses)).subscribe(
        courses => {
          const currentCourse = courses[0];

          if (!currentCourse) { return; }

          this.breadcrumbs = [{text: 'Courses', url: '/courses'}, {text: currentCourse.title, url: ''}];
          this.title = currentCourse.title;
          this.description = currentCourse.description;
          this.dateElement.date = currentCourse.date.toISOString().substr(0, 10);
          this.durationElement.duration = currentCourse.duration;
          this.authorsElement.selectedOptions = currentCourse.authors;
      });
    }
  }

  onSave() {
    this.pageTitle === 'Edit course' ? this.updateCourse() : this.addNewCourse();
    this.route.navigate(['']);
  }

  onCancel() {
    this.route.navigate(['']);
  }

  addNewCourse() {
    const newCourse = new Course(
      Math.random().toString(36).substr(2, 9),
      this.title,
      new Date(this.dateElement.date),
      this.description,
      this.durationElement.duration,
      false,
      this.authorsElement.selectedOptions || [],
    );

    this.store.dispatch(CoursesActions.AddNewCourse({ course: newCourse }));
  }

  updateCourse() {
    const id = this.activatedRoute.snapshot.params.id;

    const updatedCourse = new Course(
      id,
      this.title,
      new Date(this.dateElement.date),
      this.description,
      this.durationElement.duration,
      false,
      this.authorsElement.selectedOptions || [],
    );

    this.store.dispatch(CoursesActions.UpdateCourse({ course: updatedCourse }));
  }
}
