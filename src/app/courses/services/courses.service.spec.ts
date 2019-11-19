import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';

import { Course } from '../models/course.model';

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

  it('should create new course', () => {
    const newCourseProps = {
      id: '4',
      title: 'Programming: Java',
      date: new Date(2021, 10, 9),
      description: 'few words description',
      duration: 70,
    };
    const newCourse = new Course(
      newCourseProps.id,
      newCourseProps.title,
      newCourseProps.date,
      newCourseProps.description,
      newCourseProps.duration,
    );

    expect(service.createCourse(
      service.coursesList,
      newCourseProps.id,
      newCourseProps.title,
      newCourseProps.date,
      newCourseProps.description,
      newCourseProps.duration,
    )).toEqual(service.coursesList);
    expect(service.coursesList.length).toEqual(2);
    expect(service.coursesList[1]).toEqual(newCourse);
  });

  it('should get course by id', () => {
    expect(service.getCourse(service.coursesList, '2')).toEqual(service.coursesList[0]);
  });

  it('should not update course', () => {
    const updatedCourse = new Course(
      '2',
      'Programming: C#',
      new Date(2018, 10, 9),
      'new description',
      90,
      true,
    );

    expect(service.updateCourse(service.coursesList, 'not existed id', updatedCourse)).toEqual(coursesList);
  });

  it('should update course', () => {
    const updatedCourse = new Course(
      '2',
      'Programming: C#',
      new Date(2018, 10, 9),
      'new description',
      90,
      true,
    );

    expect(service.updateCourse(service.coursesList, '2', updatedCourse)).toEqual(service.coursesList);
    expect(service.coursesList[0]).toEqual(updatedCourse);
  });

  it('should remove course', () => {
    expect(service.removeCourse(service.coursesList, '2')).toEqual([]);
  });
});
