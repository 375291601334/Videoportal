import { Injectable } from '@angular/core';

import { IUser, User } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: IUser = new User('0', 'User', 'Name');

  constructor() {}

  login() {
    window.localStorage.setItem('user', JSON.stringify(this.user));
  }

  logout() {
    window.localStorage.removeItem('user');
  }

  getUserInfo() {
    return JSON.parse(window.localStorage.getItem('user'));
  }

  isUserAuthentificated() {
    return window.localStorage.getItem('user') ? true : false;
  }
}
