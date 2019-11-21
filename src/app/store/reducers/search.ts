import { createReducer, on } from '@ngrx/store';

import * as fromRoot from './index';
import * as SearchActions from '../actions/search';

export interface State extends fromRoot.State {
  searchTerm: string;
}

const initialState = '';

export const reducer = createReducer(
  initialState,
  on(SearchActions.ChangeSearchTerm, (state, { term }) => (term)),
);

export const getSearchTerm = (state: State): string => state.searchTerm;
