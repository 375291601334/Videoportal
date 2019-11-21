import { Injectable } from '@angular/core';

import { ICourse, Course } from '../../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  coursesList: ICourse[] = [
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

  constructor() {}

  getCourses() {
    return this.coursesList;
  }
}
