import { Component, OnInit } from '@angular/core';

import { Course, ICourse } from '../../models/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses: ICourse[];

  constructor() { }

  ngOnInit() {
    this.courses = [
      new Course(
        '0',
        'Video Course 1. Name tag',
        new Date(2018, 10, 9),
        'Learn about where you can find course descriptions, what information they include, ' +
          'how they work, and details about various components of a course description. Course ' +
          'descriptions report information about a university or college\'s classes. They\'re published ' +
          'both in course catalogs that outline degree requirements and in course schedules that contain ' +
          'descriptions for all courses offered during a particular semester.',
        88,
      ),
      new Course(
        '1',
        'Video Course 1. Name tag',
        new Date(2018, 10, 9),
        'Learn about where you can find course descriptions, what information they include, ' +
          'how they work, and details about various components of a course description. Course ' +
          'descriptions report information about a university or college\'s classes. They\'re published ' +
          'both in course catalogs that outline degree requirements and in course schedules that contain ' +
          'descriptions for all courses offered during a particular semester.',
        88,
      ),
      new Course(
        '2',
        'Video Course 1. Name tag',
        new Date(2018, 10, 9),
        'Learn about where you can find course descriptions, what information they include, ' +
          'how they work, and details about various components of a course description. Course ' +
          'descriptions report information about a university or college\'s classes. They\'re published ' +
          'both in course catalogs that outline degree requirements and in course schedules that contain ' +
          'descriptions for all courses offered during a particular semester.',
        88,
      ),
      new Course(
        '2',
        'Video Course 1. Name tag',
        new Date(2018, 10, 9),
        'Learn about where you can find course descriptions, what information they include, ' +
          'how they work, and details about various components of a course description. Course ' +
          'descriptions report information about a university or college\'s classes. They\'re published ' +
          'both in course catalogs that outline degree requirements and in course schedules that contain ' +
          'descriptions for all courses offered during a particular semester.',
        88,
      ),
    ];
  }

  loadMoreCourses() {
    console.log('Loading more courses...');
  }

  deleteCourse(id: string) {
    console.log(`Deleting course with id=${id}!!!`);
  }
}
