import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from '../../../store/reducers/auth';
import * as AuthActions from '../../../store/actions/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPageComponent implements OnInit {
  email: string;
  password: string;
  isUserAuthentificating: Observable<boolean>;

  constructor(
    private store: Store<fromAuth.State>,
  ) {}

  ngOnInit() {
    this.isUserAuthentificating = this.store.pipe(select(fromAuth.isUserAuthentificating));
  }

  onLogin() {
    this.store.dispatch(AuthActions.Login({ email: this.email, password: this.password }));
  }
}
