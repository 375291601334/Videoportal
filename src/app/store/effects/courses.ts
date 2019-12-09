import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom, combineLatest } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { CoursesService } from '../../courses/services/courses/courses.service';

import * as fromCourses from '../reducers/courses';

import * as CoursesActions from '../actions/courses';
import { concat } from 'rxjs';

@Injectable()
export class CoursesEffects {
  constructor(
    private store: Store<fromCourses.State>,
    private actions$: Actions,
    private coursesService: CoursesService,
  ) {}

  fetchCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.FetchCourses),
      switchMap(({ query }) => this.coursesService.getCourses(query)),
      map((courses) => CoursesActions.FetchCoursesSuccess({ courses })),
    ),
  );

  fetchCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.FetchCourse),
      switchMap(({ id }) => this.coursesService.getCourse(id)),
      map((course) => CoursesActions.FetchCoursesSuccess({ courses: [course] })),
    ),
  );

  fetchAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.FetchAuthors),
      switchMap(() => this.coursesService.getAuthors()),
      map((authors) => CoursesActions.FetchAuthorsSuccess({ authors })),
    ),
  );

  addNewCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.AddNewCourse),
      switchMap(({ course }) => this.coursesService.addCourse(course)),
      withLatestFrom(
        this.store.pipe(select(fromCourses.getSearchTerm)),
        this.store.pipe(select(fromCourses.getSortField)),
        this.store.pipe(select(fromCourses.getCoursesCount)),
      ),
      map(([_, searchTerm, sortField, coursesCount]) => {
        const query = `start=0&count=${coursesCount}` +
          (searchTerm !== '' ? `&textFragment=${searchTerm}` : ``) +
          (sortField !== '' ? `&sort=${sortField}` : ``);

        return CoursesActions.FetchCourses({ query });
      }),
    ),
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.UpdateCourse),
      switchMap(({ course }) => concat(
        this.coursesService.deleteCourse(course.id),
        this.coursesService.addCourse(course),
      )),
      withLatestFrom(
        this.store.pipe(select(fromCourses.getSearchTerm)),
        this.store.pipe(select(fromCourses.getSortField)),
        this.store.pipe(select(fromCourses.getCoursesCount)),
      ),
      map(([_, searchTerm, sortField, coursesCount]) => {
        const query = `start=0&count=${coursesCount}` +
          (searchTerm !== '' ? `&textFragment=${searchTerm}` : ``) +
          (sortField !== '' ? `&sort=${sortField}` : ``);

        return CoursesActions.FetchCourses({ query });
      }),
    ),
  );

  removeCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.RemoveCourse),
      switchMap(({ id }) => this.coursesService.deleteCourse(id)),
      withLatestFrom(
        this.store.pipe(select(fromCourses.getSearchTerm)),
        this.store.pipe(select(fromCourses.getSortField)),
        this.store.pipe(select(fromCourses.getCoursesCount)),
      ),
      map(([_, searchTerm, sortField, coursesCount]) => {
        console.log(searchTerm + ' ' + sortField + ' ' + coursesCount);
        const query = `start=0&count=${coursesCount}` +
          (searchTerm !== '' ? `&textFragment=${searchTerm}` : ``) +
          (sortField !== '' ? `&sort=${sortField}` : ``);

        return CoursesActions.FetchCourses({ query });
      }),
    ),
  );
}
