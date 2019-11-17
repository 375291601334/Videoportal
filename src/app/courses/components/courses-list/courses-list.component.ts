import { Component, OnInit, Input, OnChanges } from '@angular/core';
import Swal from 'sweetalert2';

import { CoursesService } from '../../services/courses.service';

import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { OrderByPipe } from '../../pipes/order-by/order-by.pipe';

import { ICourse } from '../../models/course.model';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit, OnChanges {
  @Input() searchTerm: string;

  courses: ICourse[];
  filteredCourses: ICourse[];
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
    private service: CoursesService,
  ) {}

  ngOnInit() {
    this.courses = this.service.getCourses();
    this.filteredCourses = this.courses;
  }

  onSortingSelect(selectedOrder: Order): void {
    this.selectedOrder = selectedOrder;
    this.filteredCourses = this.order.transform(this.filteredCourses, selectedOrder.prop, selectedOrder.isDesc);
  }

  ngOnChanges() {
    this.filteredCourses = this.order.transform(
      this.filter.transform(this.courses, 'title', this.searchTerm),
      this.selectedOrder.prop,
      this.selectedOrder.isDesc,
    );
  }

  loadMoreCourses() {
    console.log('Loading more courses...');
  }

  deleteCourse(id: string) {
    const course = this.service.getCourse(this.courses, id);
    Swal.fire({
      title: 'Delete course?',
      text: `Are you sure you want to delete ${course.title}?`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      reverseButtons: true,
    }).then((result) => {
        if (result.value) {
          this.courses = this.service.removeCourse(this.courses, id);
          this.ngOnChanges();
        }
      });
  }

  addCourse() {
    this.courses = this.service.createCourse(
      this.courses,
      '2',
      'Scrum and Agile',
      new Date(2020, 1, 9),
      'Learn about where you can find course descriptions, what information they include, ' +
        'how they work, and details about various components of a course description. Course ' +
        'descriptions report information about a university or college\'s classes. They\'re published ' +
        'both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.',
      340,
      false,
    );
    this.ngOnChanges();
  }
}
