import { reducer } from '../search';
import * as SearchActions from '../../actions/search';

describe('SearchReducer', () => {
  const initialState = '';

  describe('Undefined Action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual('');
    });
  });

  describe('Fetch Courses Success', () => {
    it('should return new search term', () => {
      const action = SearchActions.ChangeSearchTerm({ term: 'Test' });
      const result = reducer(initialState, action);

      expect(result).toEqual('Test');
    });
  });
});
