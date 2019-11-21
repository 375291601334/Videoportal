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
  };

  describe('Undefined Action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('Login Success', () => {
    it('should return user info and change isUserAuthentificated to true', () => {
      const mockUser = { id: '0', firstName: 'Kate', lastName: 'Sparks'};
      const action = AuthActions.LoginSuccess({ user: mockUser });
      const result = reducer(initialState, action);

      const state: AuthState = {
        isUserAuthentificated: true,
        user: mockUser,
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
