import { createReducer, createSelector, on, Action } from '@ngrx/store';
import { Guid } from 'guid-typescript';

import * as fromRoot from './index';
import * as CoursesActions from '../actions/courses';

import { ICourse } from '../../courses/models/course.model';

export interface State extends fromRoot.State {
  courses: CoursesState;
}

export interface CoursesState {
  isCoursesFetched: boolean;
  items: ICourse[];
}

const initialState: CoursesState = {
  isCoursesFetched: false,
  items: [],
};

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.FetchCoursesSuccess, (state, { courses }) => ({
    isCoursesFetched: true,
    items: [...state.items, ...courses],
  })),
  on(CoursesActions.AddNewCourse, (state, { course }) => ({
    ...state,
    items: [
      ...state.items,
      { ...course, id: Guid.create().toString() },
    ],
  })),
  on(CoursesActions.RemoveCourse, (state, { id }) => ({
    ...state,
    items: state.items.filter(course => course.id !== id),
  })),
  on(CoursesActions.UpdateCourse, (state, { id, value }) => ({
    ...state,
    items: [value, ...state.items.filter(course => course.id !== id)],
  })),
);

export function reducer(state: CoursesState, action: Action) {
  return coursesReducer(state, action);
}

export const getCoursesState = (state: State): CoursesState => state.courses;

export const getCourses = createSelector(
  getCoursesState, (state: CoursesState) => state.items,
);

export const isCoursesFetched = createSelector(
  getCoursesState, (state: CoursesState) => state.isCoursesFetched,
);
