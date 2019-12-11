import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as fromCourses from '../../../store/reducers/courses';
import * as CoursesActions from '../../../store/actions/courses';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchTearm = '';
  waitingTime = 2000;
  minTermLength = 2;
  private subj = new Subject<string>();

  constructor(
    private store: Store<fromCourses.State>,
  ) {}

  ngOnInit() {
    this.store.pipe(select(fromCourses.getSearchTerm)).subscribe(
      term => this.searchTearm = term,
    );

    this.subj.pipe(debounceTime(this.waitingTime)).subscribe(
      term => {
        if (term.length > this.minTermLength) {
          this.searchTearm = term;
          this.store.dispatch(CoursesActions.ChangeSearchTerm({ term: this.searchTearm }));
        }
      },
    );
  }

  onChangeSearchTerm(term: string) {
    this.subj.next(term);
  }
}
