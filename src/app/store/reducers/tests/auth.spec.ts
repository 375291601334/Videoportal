import { AuthState, reducer } from '../auth';
import * as AuthActions from '../../actions/auth';

describe('AuthReducer', () => {
  const initialState: AuthState = {
    isUserAuthentificated: false,
    user: {
      id: '',
      firstName: '',
      lastName: '',
    },
    token: '',
  };

  describe('Undefined Action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('Login Success', () => {
    it('should return user info and change isUserAuthentificated to true', () => {
      const action = AuthActions.LoginSuccess({ token: '12345' });
      const result = reducer(initialState, action);

      const state: AuthState = {
        ...initialState,
        isUserAuthentificated: true,
        token: '12345',
      };
      expect(result).toEqual(state);
    });
  });

  describe('FetchUserInfoSuccess', () => {
    it('should return fetched user info', () => {
      const mockUser = { id: '1', firstName: 'Adam', lastName: 'Black' };
      const action = AuthActions.FetchUserInfoSuccess({ user: mockUser });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        user: mockUser,
      });
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
