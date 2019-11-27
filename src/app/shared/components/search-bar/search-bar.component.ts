import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromSearch from '../../../store/reducers/search';
import * as SearchActions from '../../../store/actions/search';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchTearm = '';

  constructor(
    private store: Store<fromSearch.State>,
  ) {}

  onClick(): void {
    this.store.dispatch(SearchActions.ChangeSearchTerm({ term: this.searchTearm }));
  }
}
