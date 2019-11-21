import { createAction, props } from '@ngrx/store';

export const ChangeSearchTerm = createAction(
  '[Search] Change Search Term',
  props<{ term: string }>(),
);
