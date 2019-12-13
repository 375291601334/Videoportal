import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './auth';
import * as fromCourses from './courses';
import * as fromUser from './user';

export interface State {
  auth: fromAuth.AuthState;
  courses: fromCourses.CoursesState;
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  courses: fromCourses.reducer,
  user: fromUser.reducer,
};
