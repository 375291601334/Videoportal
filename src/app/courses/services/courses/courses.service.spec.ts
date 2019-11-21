import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';

import { Course } from '../../models/course.model';

describe('CoursesService', () => {
  let service: CoursesService;
  const coursesList = [
    new Course('2', 'Programming: C#', new Date(2018, 10, 9), '...', 60, true),
  ];

  beforeEach(() => {
    service = new CoursesService();
    service.coursesList = coursesList;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get courses list', () => {
    expect(service.getCourses()).toEqual(service.coursesList);
  });
});
