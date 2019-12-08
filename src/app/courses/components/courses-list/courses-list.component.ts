import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import Swal from 'sweetalert2';

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
  courses: ICourse[];
  maxCoursesNumber = 3;
  coursesCount: number;

  orders: Order[] = [
    { name: 'Duration', prop: 'length' },
    { name: 'Start date', prop: 'date'},
    { name: 'Title', prop: 'name' },
  ];
  defaultOrder: Order = { name: '', prop: '' };
  selectedOrder: Order = this.defaultOrder;

  constructor(
    private store: Store<fromCourses.State>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.coursesSubscription = this.store.pipe(select(fromCourses.getCourses)).subscribe(
      courses => this.courses = courses,
    );

    this.querySubscription = combineLatest([
      this.store.pipe(select(fromCourses.getSearchTerm)),
      this.store.pipe(select(fromCourses.getCoursesCount)),
      this.store.pipe(select(fromCourses.getSortField)),
    ]).subscribe(([searchTerm, coursesCount, sortField]) => {
      const query = `start=0&count=${coursesCount}` +
        (searchTerm !== '' ? `&textFragment=${searchTerm}` : ``) +
        (sortField !== '' ? `&sort=${sortField}` : ``);

      if (sortField !== '') {
        this.selectedOrder = this.orders.find(
          order => order.prop === sortField,
        );
      }

      this.coursesCount = coursesCount;
      this.store.dispatch(CoursesActions.FetchCourses({ query }));
    });
  }

  ngOnDestroy() {
    this.store.dispatch(CoursesActions.ClearCourses());

    this.coursesSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
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
