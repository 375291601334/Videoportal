import { createSelector, createReducer, on, Action } from '@ngrx/store';

import * as fromRoot from './index';
import * as UserActions from '../actions/user';

import { IUser } from '../../login/models/user.model';

export interface UserState {
  isUserInfoLoading: boolean;
  userInfo: IUser;
}

export interface State extends fromRoot.State {
  user: UserState;
}

const initialState: UserState = {
  isUserInfoLoading: false,
  userInfo: {
    id: '',
    firstName: '',
    lastName: '',
  },
};

const userReducer = createReducer(
  initialState,
  on(UserActions.FetchUserInfo, (state) => ({
    ...state,
    isUserInfoLoading: true,
  })),
  on(UserActions.FetchUserInfoSuccess, (state, { user }) => ({
    ...state,
    userInfo: user,
    isUserInfoLoading: false,
  })),
);

export function reducer(state: UserState, action: Action) {
  return userReducer(state, action);
}

export const getUserState = (state: State): UserState  => state.user;

export const isUserInfoLoading = createSelector(
  getUserState, (state: UserState) => state.isUserInfoLoading,
);

export const getUserInfo = createSelector(
  getUserState, (state: UserState) => state.userInfo,
);
