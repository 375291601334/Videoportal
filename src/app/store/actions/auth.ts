import { createAction, props } from '@ngrx/store';

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
