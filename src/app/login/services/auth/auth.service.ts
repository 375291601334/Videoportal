import { Injectable } from '@angular/core';

import { IUser, User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: IUser = new User('0', 'User', 'Name');

  constructor() {}

  login() {
    return this.user;
  }
}
