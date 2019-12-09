import { createAction, props } from '@ngrx/store';

import { IUser } from '../../login/models/user.model';

export const Login = createAction(
  '[Auth] Login', props<{ email: string, password: string }>(),
);

export const Logout = createAction(
  '[Auth] Logout',
);

export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>(),
);

export const FetchUserInfo = createAction(
  '[User Info] Fetch User Info', props<{ token: string }>(),
);

export const FetchUserInfoSuccess = createAction(
  '[User Info] Fetch User Info Success', props<{ user: IUser }>(),
);
