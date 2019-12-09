import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromCourses from '../../../store/reducers/courses';
import * as CoursesActions from '../../../store/actions/courses';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchTearm = '';

  constructor(
    private store: Store<fromCourses.State>,
  ) {}

  ngOnInit() {
    this.store.pipe(select(fromCourses.getSearchTerm)).subscribe(
      term => this.searchTearm = term,
    );
  }

  onClick(): void {
    this.store.dispatch(CoursesActions.ChangeSearchTerm({ term: this.searchTearm }));
  }
}
