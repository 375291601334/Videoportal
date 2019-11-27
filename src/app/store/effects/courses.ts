import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { CoursesService } from '../../courses/services/courses/courses.service';

import * as CoursesActions from '../actions/courses';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
  ) {}

  FetchCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.FetchCourses),
      map(() => {
        const courses = this.coursesService.getCourses();
        return CoursesActions.FetchCoursesSuccess({ courses });
      }),
    ),
  );
}
