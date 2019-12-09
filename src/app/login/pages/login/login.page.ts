import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAuth from '../../../store/reducers/auth';
import * as AuthActions from '../../../store/actions/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPageComponent {
  email: string;
  password: string;

  constructor(
    private store: Store<fromAuth.State>,
  ) {}

  onLogin() {
    this.store.dispatch(AuthActions.Login({ email: this.email, password: this.password }));
  }
}
