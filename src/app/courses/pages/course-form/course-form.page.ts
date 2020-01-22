import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

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
export class CourseFormPageComponent implements OnInit, OnDestroy {
  @ViewChild('authors', { static: true }) authorsElement: MultiSelectComponent;
  @ViewChild('date', { static: true }) dateElement: DateInputComponent;

  pageTitle: string;
  breadcrumbs: {text: string, url: string}[];
  authorsSubscription: Subscription;
  authorsOptions: { id: string, name: string }[];
  courseForm: FormGroup;
  coursesSubscription: Subscription;
  languageSubscription: Subscription;
  prefilledData: ICourse;
  prefilledDate = '';

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromCourses.State>,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
  ) {
    this.courseForm = this.initForm();

    if (this.activatedRoute.snapshot.data.title === 'Edit course') {
      const courseId = this.activatedRoute.snapshot.params.id;

      this.store.dispatch(CoursesActions.FetchCourse({ id: courseId }));

      this.coursesSubscription = this.store.pipe(select(fromCourses.getCourses)).subscribe(
        courses => {
          this.prefilledData = courses[0];

          if (!this.prefilledData) { return; }

          this.prefilledDate = this.getFormattedDate(this.prefilledData.date);

          this.breadcrumbs = [{text: this.translate.instant('Courses'), url: '/courses'}, {text: this.prefilledData.title, url: ''}];

          this.courseForm.patchValue({
            title: this.prefilledData.title || '',
            description: this.prefilledData.description || '',
            topRated: this.prefilledData.topRated || false,
          });
      });
    }

    this.languageSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.pageTitle = this.translate.instant(this.activatedRoute.snapshot.data.title);

      this.breadcrumbs = this.activatedRoute.snapshot.data.title === 'Edit course'
      ? [{text: this.translate.instant('Courses'), url: '/courses'}, {text: this.prefilledData.title, url: ''}]
      : [{text: this.translate.instant('Courses'), url: '/courses'}, {text: this.translate.instant('New'), url: ''}];
    });
  }

  ngOnInit() {
    this.pageTitle = this.translate.instant(this.activatedRoute.snapshot.data.title);

    this.breadcrumbs = this.activatedRoute.snapshot.data.title === 'Edit course'
      ? [{text: this.translate.instant('Courses'), url: '/courses'}, {text: this.prefilledData && this.prefilledData.title, url: ''}]
      : [{text: this.translate.instant('Courses'), url: '/courses'}, {text: this.translate.instant('New'), url: ''}];

    this.store.dispatch(CoursesActions.FetchAuthors());
    this.authorsSubscription = this.store.pipe(select(fromCourses.getAuthors)).subscribe(
      authors => this.authorsOptions = authors,
    );
  }

  ngOnDestroy() {
    if (this.activatedRoute.snapshot.data.title === 'Edit course') {
      this.coursesSubscription.unsubscribe();
    }

    this.authorsSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

  private getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return month + '-' + day + '-' + year;
  }

  initForm() {
    return this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        date: this.formBuilder.group({
          value: [null, Validators.required],
        }),
        topRated: [null],
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
    this.activatedRoute.snapshot.data.title === 'Edit course' ? this.updateCourse() : this.addNewCourse();
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
      this.courseForm.value.topRated,
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
      this.courseForm.value.topRated,
      this.courseForm.value.authors.value,
    );

    this.store.dispatch(CoursesActions.UpdateCourse({ course: updatedCourse }));
  }
}
