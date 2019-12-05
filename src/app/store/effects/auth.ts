import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

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
      map(() => {
        const user = this.authService.login();
        return AuthActions.LoginSuccess({ user });
      }),
    ),
  );
}
