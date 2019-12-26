import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';

import { AuthService } from '../../login/services/auth/auth.service';

import * as AuthActions from '../actions/auth';
import * as UserActions from '../actions/user';

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
      switchMap(({ email, password }) => {
        return this.authService.login(email, password).pipe(
          map(({ token }) => AuthActions.LoginSuccess({ token })),
          catchError(() => of(AuthActions.LoginError())),
        );
      }),
    ),
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginSuccess),
      map(({ token }) => UserActions.FetchUserInfo({ token })),
      tap(() => this.router.navigate(['/'])),
    ),
  );
}
