import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { OrderByPipe } from '../../pipes/order-by/order-by.pipe';

import { Course, ICourse } from '../../models/course.model';
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
  selectedOrder: Order | number = 0;

  constructor(
    private filter: FilterPipe,
    private order: OrderByPipe,
  ) {}

  ngOnInit() {
    this.courses = [
      new Course(
        '0',
        'Javascript',
        new Date(2019, 10, 9),
        'Learn about where you can find course descriptions, what information they include, ' +
          'how they work, and details about various components of a course description. Course ' +
          'descriptions report information about a university or college\'s classes. They\'re published ' +
          'both in course catalogs that outline degree requirements and in course schedules that contain ' +
          'descriptions for all courses offered during a particular semester.',
        807,
        true,
      ),
      new Course(
        '1',
        'Programming: Angular',
        new Date(2019, 9, 29),
        'Learn about where you can find course descriptions, what information they include, ' +
          'how they work, and details about various components of a course description. Course ' +
          'descriptions report information about a university or college\'s classes. They\'re published ' +
          'both in course catalogs that outline degree requirements and in course schedules that contain ' +
          'descriptions for all courses offered during a particular semester.',
        18,
      ),
      new Course(
        '2',
        'Python',
        new Date(2018, 10, 9),
        'Learn about where you can find course descriptions, what information they include, ' +
          'how they work, and details about various components of a course description. Course ' +
          'descriptions report information about a university or college\'s classes. They\'re published ' +
          'both in course catalogs that outline degree requirements and in course schedules that contain ' +
          'descriptions for all courses offered during a particular semester.',
        109,
        true,
      ),
      new Course(
        '2',
        'Programming: C#',
        new Date(2018, 10, 9),
        'Learn about where you can find course descriptions, what information they include, ' +
          'how they work, and details about various components of a course description. Course ' +
          'descriptions report information about a university or college\'s classes. They\'re published ' +
          'both in course catalogs that outline degree requirements and in course schedules that contain ' +
          'descriptions for all courses offered during a particular semester.',
        60,
        true,
      ),
    ];

    this.filteredCourses = this.courses;
  }

  onSortingSelect(selectedOrder: Order): void {
    this.filteredCourses = this.order.transform(this.filteredCourses, selectedOrder.prop, selectedOrder.isDesc);
  }

  ngOnChanges() {
    this.filteredCourses = this.filter.transform(this.courses, 'title', this.searchTerm);
  }

  loadMoreCourses() {
    console.log('Loading more courses...');
  }

  deleteCourse(id: string) {
    console.log(`Deleting course with id=${id}!!!`);
  }

  addCourse() {
    console.log('Adding new course...');
  }
}
