import { createReducer, on, Action } from '@ngrx/store';
import { Guid } from 'guid-typescript';

import * as fromRoot from './index';
import * as CoursesActions from '../actions/courses';

import { ICourse } from '../../courses/models/course.model';

export interface State extends fromRoot.State {
  courses: ICourse[];
}

const initialState: ICourse[] = [];

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.FetchCoursesSuccess, (state, { courses }) => ([
    ...state,
    ...courses,
  ])),
  on(CoursesActions.AddNewCourse, (state, { course }) => ([
    ...state,
    { ...course, id: Guid.create().toString() },
  ])),
  on(CoursesActions.RemoveCourse, (state, { id }) => ([
    ...state.filter(course => course.id !== id),
  ])),
);

export function reducer(state: ICourse[], action: Action) {
  return coursesReducer(state, action);
}

export const getCourses = (state: State): ICourse[] => state.courses;
