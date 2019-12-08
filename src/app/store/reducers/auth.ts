import { createSelector, createReducer, on, Action } from '@ngrx/store';

import * as fromRoot from './index';
import * as AuthActions from '../actions/auth';

import { IUser } from '../../login/models/user.model';

export interface AuthState {
  isUserAuthentificated: boolean;
  user: IUser;
  token: string;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

const initialState: AuthState = {
  isUserAuthentificated: false,
  user: {
    id: '',
    firstName: '',
    lastName: '',
  },
  token: '',
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.LoginSuccess, (state, { token }) => ({
    ...state,
    token,
    isUserAuthentificated: true,
  })),
  on(AuthActions.Logout, (state) => ({
    ...initialState,
  })),
  on(AuthActions.FetchUserInfoSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
);

export function reducer(state: AuthState, action: Action) {
  return authReducer(state, action);
}

export const getAuthState = (state: State): AuthState  => state.auth;

export const isUserAuthentificated = createSelector(
  getAuthState, (state: AuthState) => state.isUserAuthentificated,
);

export const getUserInfo = createSelector(
  getAuthState, (state: AuthState) => state.user,
);

export const getUserToken = createSelector(
  getAuthState, (state: AuthState) => state.token,
);
