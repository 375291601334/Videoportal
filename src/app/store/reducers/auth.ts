import { createSelector, createReducer, on, Action } from '@ngrx/store';

import * as fromRoot from './index';
import * as AuthActions from '../actions/auth';

export interface AuthState {
  isUserAuthentificating: boolean;
  isUserAuthentificated: boolean;
  isAuthentificationFailed: boolean;
  token: string;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

const initialState: AuthState = {
  isUserAuthentificating: false,
  isUserAuthentificated: false,
  isAuthentificationFailed: false,
  token: '',
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.Login, (state) => ({
    ...initialState,
    isUserAuthentificating: true,
  })),
  on(AuthActions.LoginSuccess, (state, { token }) => ({
    ...state,
    token,
    isUserAuthentificating: false,
    isUserAuthentificated: true,
  })),
  on(AuthActions.LoginError, (state) => ({
    ...initialState,
    isAuthentificationFailed: true,
  })),
  on(AuthActions.Logout, (state) => ({
    ...initialState,
  })),
);

export function reducer(state: AuthState, action: Action) {
  return authReducer(state, action);
}

export const getAuthState = (state: State): AuthState  => state.auth;

export const isUserAuthentificated = createSelector(
  getAuthState, (state: AuthState) => state.isUserAuthentificated,
);

export const isAuthentificationFailed = createSelector(
  getAuthState, (state: AuthState) => state.isAuthentificationFailed,
);

export const isUserAuthentificating = createSelector(
  getAuthState, (state: AuthState) => state.isUserAuthentificating,
);

export const getUserToken = createSelector(
  getAuthState, (state: AuthState) => state.token,
);
