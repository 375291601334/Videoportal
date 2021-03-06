import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import * as fromCourses from '../../../store/reducers/courses';
import * as CoursesActions from '../../../store/actions/courses';

import { ICourse } from '../../models/course.model';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit, OnDestroy {
  coursesSubscription: Subscription;
  querySubscription: Subscription;
  languageSubscription: Subscription;
  query: string;
  isCoursesFetching: Observable<boolean>;
  courses: ICourse[];
  maxCoursesNumber = 3;
  coursesCount: number;

  orders: Order[];
  defaultOrder: Order = { name: '', prop: '' };
  selectedOrder: Order = this.defaultOrder;

  constructor(
    private store: Store<fromCourses.State>,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.languageSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.orders = [
        { name: this.translate.instant('Duration'), prop: 'length' },
        { name: this.translate.instant('Start date'), prop: 'date'},
        { name: this.translate.instant('Title'), prop: 'name' },
      ];

      this.store.dispatch(CoursesActions.FetchCourses({ query: this.query }));
    });
  }

  ngOnInit() {
    this.orders = [
      { name: this.translate.instant('Duration'), prop: 'length' },
      { name: this.translate.instant('Start date'), prop: 'date'},
      { name: this.translate.instant('Title'), prop: 'name' },
    ];

    this.coursesSubscription = this.store.pipe(select(fromCourses.getCourses)).subscribe(
      courses => this.courses = courses,
    );

    this.isCoursesFetching = this.store.pipe(select(fromCourses.isCoursesFetching));

    this.querySubscription = combineLatest([
      this.store.pipe(select(fromCourses.getSearchTerm)),
      this.store.pipe(select(fromCourses.getCoursesCount)),
      this.store.pipe(select(fromCourses.getSortField)),
    ]).subscribe(([searchTerm, coursesCount, sortField]) => {
      this.query = `start=0&count=${coursesCount}` +
        (searchTerm !== '' ? `&textFragment=${searchTerm}` : ``) +
        (sortField !== '' ? `&sort=${sortField}` : ``);

      if (sortField !== '') {
        this.selectedOrder = this.orders.find(
          order => order.prop === sortField,
        );
      }

      this.coursesCount = coursesCount;
      this.store.dispatch(CoursesActions.FetchCourses({ query: this.query }));
    });
  }

  ngOnDestroy() {
    this.coursesSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
    this.languageSubscription.unsubscribe();

    this.store.dispatch(CoursesActions.ClearCourses());
  }

  goToNewCoursePage() {
    this.router.navigate(['courses', 'new']);
  }

  onSortingSelect(selectedOrder: Order): void {
    this.store.dispatch(CoursesActions.ChangeSortField({ sort: selectedOrder.prop }));
  }

  onEditCourse(id: string) {
    this.router.navigate(['courses', id]);
  }

  onDeleteCourse(course: ICourse) {
    Swal.fire({
      title: 'Delete course?',
      text: `Are you sure you want to delete ${course.title}?`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      reverseButtons: true,
    }).then((result) => {
        if (result.value) {
          this.store.dispatch(CoursesActions.RemoveCourse({ id: course.id }));
        }
      });
  }

  loadMoreCourses() {
    this.maxCoursesNumber += 3;
    this.store.dispatch(CoursesActions.ChangeCoursesCount({ count: this.coursesCount + 3 }));
  }
}
