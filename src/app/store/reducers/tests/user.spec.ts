import { UserState, reducer } from '../user';
import * as UserActions from '../../actions/user';

describe('UserReducer', () => {
  const initialState: UserState = {
    isUserInfoLoading: false,
    userInfo: {
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

  describe('FetchUserInfo', () => {
    it('should change isUserInfoLoading to true', () => {
      const action = UserActions.FetchUserInfo({ token: 'token' });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isUserInfoLoading: true,
      });
    });
  });

  describe('FetchUserInfoSuccess', () => {
    it('should return fetched user info', () => {
      const mockUser = { id: '1', firstName: 'Adam', lastName: 'Black' };
      const action = UserActions.FetchUserInfoSuccess({ user: mockUser });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        isUserInfoLoading: false,
        userInfo: mockUser,
      });
    });
  });
});
