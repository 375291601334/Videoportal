import { createReducer, on, Action } from '@ngrx/store';

import * as fromRoot from './index';
import * as SearchActions from '../actions/search';

export interface State extends fromRoot.State {
  searchTerm: string;
}

const initialState = '';

const searchReducer = createReducer(
  initialState,
  on(SearchActions.ChangeSearchTerm, (state, { term }) => (term)),
);

export function reducer(state: string, action: Action) {
  return searchReducer(state, action);
}

export const getSearchTerm = (state: State): string => state.searchTerm;
