import { createAction, props } from '@ngrx/store';

import { IUser } from '../../login/models/user.model';

export const FetchUserInfo = createAction(
  '[User] Fetch User Info', props<{ token: string }>(),
);

export const FetchUserInfoSuccess = createAction(
  '[User] Fetch User Info Success', props<{ user: IUser }>(),
);
