import { AuthState, reducer } from '../auth';
import * as AuthActions from '../../actions/auth';

describe('AuthReducer', () => {
  const initialState: AuthState = {
    isUserAuthentificated: false,
    isUserAuthentificating: false,
    isAuthentificationFailed: false,
    token: '',
  };

  describe('Undefined Action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('Login', () => {
    it('should change isUserAuthentificating to true', () => {
      const action = AuthActions.Login({ email: 'test', password: '123' });
      const result = reducer(initialState, action);

      const state: AuthState = {
        ...initialState,
        isUserAuthentificating: true,
      };
      expect(result).toEqual(state);
    });
  });

  describe('Login Success', () => {
    it('should return user info and change isUserAuthentificated to true', () => {
      const action = AuthActions.LoginSuccess({ token: '12345' });
      const result = reducer(initialState, action);

      const state: AuthState = {
        ...initialState,
        isUserAuthentificated: true,
        isUserAuthentificating: false,
        token: '12345',
      };
      expect(result).toEqual(state);
    });
  });

  describe('Login Error', () => {
    it('should change isAuthentificationFailed to true', () => {
      const action = AuthActions.LoginError();
      const result = reducer(initialState, action);

      const state: AuthState = {
        ...initialState,
        isAuthentificationFailed: true,
      };
      expect(result).toEqual(state);
    });
  });

  describe('Logout', () => {
    it('should return initial state', () => {
      const action = AuthActions.Logout();
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
