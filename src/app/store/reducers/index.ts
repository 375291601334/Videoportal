import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './auth';
import * as fromCourses from './courses';
import * as fromSearch from './search';

import { ICourse } from 'src/app/courses/models/course.model';

export interface State {
  auth: fromAuth.AuthState;
  courses: fromCourses.CoursesState;
  searchTerm: string;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  courses: fromCourses.reducer,
  searchTerm: fromSearch.reducer,
};
