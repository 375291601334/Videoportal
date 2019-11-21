import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromAuth from '../../../store/reducers/auth';
import * as AuthActions from '../../../store/actions/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPageComponent {
  constructor(
    private router: Router,
    private store: Store<fromAuth.State>,
  ) {}

  onLogin() {
    this.store.dispatch(AuthActions.Login());
    this.router.navigate(['']);
  }
}
