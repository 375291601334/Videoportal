import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { DateInputComponent } from '../../../shared/components/date-input/date-input.component';

import * as fromCourses from '../../../store/reducers/courses';
import * as CoursesActions from '../../../store/actions/courses';

import { Course, ICourse } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.page.html',
  styleUrls: ['./course-form.page.scss'],
})
export class CourseFormPageComponent implements OnInit {
  @ViewChild('authors', { static: true }) authorsElement: MultiSelectComponent;
  @ViewChild('date', { static: true }) dateElement: DateInputComponent;

  pageTitle: string;
  breadcrumbs = [{text: 'Courses', url: '/courses'}, {text: 'New', url: ''}];
  authorsOptions: { id: string, name: string }[];
  courseForm: FormGroup;
  prefilledData: ICourse;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromCourses.State>,
    private formBuilder: FormBuilder,
  ) {
    this.courseForm = this.initForm();

    this.store.pipe(select(fromCourses.getCourses)).subscribe(
      courses => this.prefilledData = courses[0],
    );

    this.pageTitle = this.activatedRoute.snapshot.data.title;

    if (this.pageTitle === 'Edit course') {
      const courseId = this.activatedRoute.snapshot.params.id;

      this.store.dispatch(CoursesActions.FetchCourse({ id: courseId }));

      this.store.pipe(select(fromCourses.getCourses)).subscribe(
        courses => {
          this.prefilledData = courses[0];

          if (!this.prefilledData) { return; }

          this.breadcrumbs = [{text: 'Courses', url: '/courses'}, {text: this.prefilledData.title, url: ''}];

          this.courseForm.patchValue({
            title: this.prefilledData.title || '',
            description: this.prefilledData.description || '',
          });
      });
    }
  }

  ngOnInit() {
    this.store.dispatch(CoursesActions.FetchAuthors());
    this.store.pipe(select(fromCourses.getAuthors)).subscribe(
      authors => this.authorsOptions = authors,
    );
  }

  initForm() {
    return this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        date: this.formBuilder.group({
          value: [null, Validators.required],
        }),
        duration: this.formBuilder.group({
          value: [null, Validators.required],
        }),
        authors: this.formBuilder.group({
          value: [[], Validators.required],
        }),
      },
    );
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
      this.courseForm.value.title,
      new Date(this.courseForm.value.date.value),
      this.courseForm.value.description,
      this.courseForm.value.duration.value,
      false,
      this.courseForm.value.authors.value,
    );

    this.store.dispatch(CoursesActions.AddNewCourse({ course: newCourse }));
  }

  updateCourse() {
    const id = this.activatedRoute.snapshot.params.id;

    const updatedCourse = new Course(
      id,
      this.courseForm.value.title,
      new Date(this.courseForm.value.date.value),
      this.courseForm.value.description,
      this.courseForm.value.duration.value,
      false,
      this.courseForm.value.authors.value,
    );

    this.store.dispatch(CoursesActions.UpdateCourse({ course: updatedCourse }));
  }
}
