import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, tap, switchMap } from 'rxjs/operators';

import { AuthService } from '../../login/services/auth/auth.service';

import * as AuthActions from '../actions/auth';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.Login),
      switchMap(({ email, password }) => this.authService.login(email, password)),
      map(({ token }) => AuthActions.LoginSuccess({ token })),
    ),
  );

  fetchUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.FetchUserInfo),
      switchMap(({ token }) => this.authService.getUserInfo(token)),
      map(({ user }) => AuthActions.FetchUserInfoSuccess({ user })),
    ),
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginSuccess),
      map(({ token }) => AuthActions.FetchUserInfo({ token })),
      tap(() => this.router.navigate(['/'])),
    ),
   );
}
