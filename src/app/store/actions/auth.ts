import { createAction, props } from '@ngrx/store';

import { IUser } from '../../login/models/user.model';

export const Login = createAction(
  '[Auth] Login',
);

export const Logout = createAction(
  '[Auth] Logout',
);

export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: IUser }>(),
);
