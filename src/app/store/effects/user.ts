import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from '../../login/services/auth/auth.service';

import * as UserActions from '../actions/user';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}

  fetchUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.FetchUserInfo),
      switchMap(({ token }) => this.authService.getUserInfo(token)),
      map(({ user }) => UserActions.FetchUserInfoSuccess({ user })),
    ),
  );
}
