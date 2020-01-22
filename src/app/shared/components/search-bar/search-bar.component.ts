import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as fromCourses from '../../../store/reducers/courses';
import * as CoursesActions from '../../../store/actions/courses';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchTermSubscription: Subscription;
  searchTearm = '';
  waitingTime = 2000;
  minTermLength = 2;
  subjSubscription: Subscription;
  private subj = new Subject<string>();

  constructor(
    private store: Store<fromCourses.State>,
  ) {}

  ngOnInit() {
    this.searchTermSubscription = this.store.pipe(select(fromCourses.getSearchTerm)).subscribe(
      term => this.searchTearm = term,
    );

    this.subjSubscription = this.subj.pipe(debounceTime(this.waitingTime)).subscribe(
      term => {
        if (term.length > this.minTermLength) {
          this.searchTearm = term;
          this.store.dispatch(CoursesActions.ChangeSearchTerm({ term: this.searchTearm }));
        }

        if (term.length <= this.minTermLength && this.searchTearm !== '') {
          this.searchTearm = '';
          this.store.dispatch(CoursesActions.ChangeSearchTerm({ term: this.searchTearm }));
        }
      },
    );
  }

  ngOnDestroy() {
    this.searchTermSubscription.unsubscribe();
    this.subjSubscription.unsubscribe();
  }

  onChangeSearchTerm(term: string) {
    this.subj.next(term);
  }
}
