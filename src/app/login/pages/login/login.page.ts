import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as fromAuth from '../../../store/reducers/auth';
import * as AuthActions from '../../../store/actions/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  isUserAuthentificating: Observable<boolean>;
  isAuthentificationFailed: Observable<boolean>;

  constructor(
    private store: Store<fromAuth.State>,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.initForm();
  }

  ngOnInit() {
    this.isUserAuthentificating = this.store.pipe(select(fromAuth.isUserAuthentificating));
    this.isAuthentificationFailed = this.store.pipe(select(fromAuth.isAuthentificationFailed));
  }

  onLogin() {
    this.store.dispatch(AuthActions.Login(this.loginForm.value));
  }

  initForm() {
    return this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
      },
    );
  }
}
