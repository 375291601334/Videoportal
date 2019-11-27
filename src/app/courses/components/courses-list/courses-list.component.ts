import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import Swal from 'sweetalert2';

import * as fromCourses from '../../../store/reducers/courses';
import * as fromSearch from '../../../store/reducers/search';
import * as CoursesActions from '../../../store/actions/courses';

import { FilterPipe } from '../../../shared/pipes/filter/filter.pipe';
import { OrderByPipe } from '../../../shared/pipes/order-by/order-by.pipe';

import { ICourse } from '../../models/course.model';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit, OnDestroy {
  courses: ICourse[];
  coursesSubscription: Subscription;
  filteredCourses: ICourse[];
  maxCoursesNumber = 3;
  orders: Order[] = [
    { name: 'Duration', prop: 'duration', isDesc: false },
    { name: 'Duration DESC', prop: 'duration', isDesc: true },
    { name: 'Start date', prop: 'date', isDesc: false },
    { name: 'Start date DESC', prop: 'date', isDesc: true },
  ];
  defaultOrder: Order = { name: '', prop: '', isDesc: false };
  selectedOrder: Order = this.defaultOrder;

  constructor(
    private filter: FilterPipe,
    private order: OrderByPipe,
    private store: Store<fromCourses.State>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.coursesSubscription = combineLatest([
      this.store.pipe(select(fromCourses.isCoursesFetched)),
      this.store.pipe(select(fromCourses.getCourses)),
      this.store.pipe(select(fromSearch.getSearchTerm)),
    ]).subscribe(([isCoursesFetched, courses, searchTerm]) => {
        this.courses = courses;
        this.filteredCourses = this.order.transform(
          this.filter.transform(courses, 'title', searchTerm),
          this.selectedOrder.prop,
          this.selectedOrder.isDesc,
        );

        if (!isCoursesFetched) {
          this.store.dispatch(CoursesActions.FetchCourses());
        }
      },
    );
  }

  onEditCourse() {
    this.router.navigate(['courses', 'new']);
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

  onSortingSelect(selectedOrder: Order): void {
    this.selectedOrder = selectedOrder;
    this.filteredCourses = this.order.transform(this.filteredCourses, selectedOrder.prop, selectedOrder.isDesc);
  }

  ngOnDestroy() {
    this.coursesSubscription.unsubscribe();
  }

  loadMoreCourses() {
    this.maxCoursesNumber += 3;
  }

  goToNewCoursePage() {
    this.router.navigate(['courses', 'new']);
  }
}
