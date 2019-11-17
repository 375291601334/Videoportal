import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User, IUser } from '../../core/models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  const user: IUser = new User('1', 'Anastasiya', 'Hushcha');

  beforeEach(() => {
    service = new AuthService();
    service.user = user;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save user info in localStorage once login', () => {
    service.login();

    expect(window.localStorage.getItem('user')).toEqual(JSON.stringify(user));
  });

  it('should delete user info from localStorage once logout', () => {
    service.login();
    expect(window.localStorage.getItem('user')).toBeTruthy();

    service.logout();
    expect(window.localStorage.getItem('user')).toBeFalsy();
    expect(service.isUserAuthentificated()).toBeFalsy();
  });

  it('should return true/false once calling isUserAuthentificated depending on login/logout where called before', () => {
    service.logout();
    expect(service.isUserAuthentificated()).toBeFalsy();

    service.login();
    expect(service.isUserAuthentificated()).toBeTruthy();
  });

  it('should return user ingo if user logined once getUserInfo calling', () => {
    service.login();

    expect(service.getUserInfo()).toEqual({ id: '1', firstName: 'Anastasiya', lastName: 'Hushcha' });
  });
});
