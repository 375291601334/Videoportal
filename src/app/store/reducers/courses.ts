import { createReducer, createSelector, on, Action } from '@ngrx/store';

import * as fromRoot from './index';
import * as CoursesActions from '../actions/courses';

import { ICourse } from '../../courses/models/course.model';

export interface State extends fromRoot.State {
  courses: CoursesState;
}

export interface CoursesState {
  isCoursesFetching: boolean;
  start: number;
  count: number;
  sort: string;
  textFragment: string;
  items: ICourse[];
  authors: { id: string, name: string }[];
}

const initialState: CoursesState = {
  isCoursesFetching: false,
  start: 0,
  count: 4,
  sort: '',
  textFragment: '',
  items: [],
  authors: [],
};

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.FetchCourses, (state) => ({
    ...state,
    isCoursesFetching: true,
  })),
  on(CoursesActions.FetchCoursesSuccess, (state, { courses }) => ({
    ...state,
    isCoursesFetching: false,
    items: courses,
  })),
  on(CoursesActions.ClearCourses, (state) => ({
    ...state,
    count: 4,
    isCoursesFetching: false,
    items: [],
  })),
  on(CoursesActions.FetchAuthorsSuccess, (state, { authors }) => ({
    ...state,
    authors,
  })),
  on(CoursesActions.ChangeSearchTerm, (state, { term }) => ({
    ...state,
    textFragment: term,
  })),
  on(CoursesActions.ChangeSortField, (state, { sort }) => ({
    ...state,
    sort,
  })),
  on(CoursesActions.ChangeCoursesCount, (state, { count }) => ({
    ...state,
    count,
  })),
);

export function reducer(state: CoursesState, action: Action) {
  return coursesReducer(state, action);
}

export const getCoursesState = (state: State): CoursesState => state.courses;

export const getCourses = createSelector(
  getCoursesState, (state: CoursesState) => state.items,
);

export const isCoursesFetching = createSelector(
  getCoursesState, (state: CoursesState) => state.isCoursesFetching,
);

export const getSearchTerm = createSelector(
  getCoursesState, (state: CoursesState) => state.textFragment,
);

export const getCoursesCount = createSelector(
  getCoursesState, (state: CoursesState) => state.count,
);

export const getSortField = createSelector(
  getCoursesState, (state: CoursesState) => state.sort,
);

export const getAuthors = createSelector(
  getCoursesState, (state: CoursesState) => state.authors,
);
