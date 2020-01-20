import { createAction, props } from '@ngrx/store';

export const Login = createAction(
  '[Auth] Login', props<{ email: string, password: string }>(),
);

export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>(),
);

export const LoginError = createAction(
  '[Auth] Login Error',
);

export const Logout = createAction(
  '[Auth] Logout',
);
