import { reducer, CoursesState } from '../courses';
import * as CoursesActions from '../../actions/courses';

import { ICourse, Course } from '../../../courses/models/course.model';

describe('CoursesReducer', () => {
  const initialState: CoursesState = {
    isCoursesFetched: false,
    items: [],
  };
  const mockCourses = [
    new Course('7', 'Test course', new Date(2018, 7, 4), 'Test description', 58, true),
  ];

  describe('Undefined Action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('Fetch Courses Success', () => {
    it('should return fetched courses', () => {
      const action = CoursesActions.FetchCoursesSuccess({ courses: mockCourses });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        isCoursesFetched: true,
        items: mockCourses,
      });
    });
  });

  describe('Add New Course', () => {
    it('should add new course', () => {
      const newCourse = new Course('796', 'New course', new Date(2016, 7, 6), 'Test description', 95, false);
      const action = CoursesActions.AddNewCourse({ course: newCourse });
      const result = reducer(initialState, action);

      expect(result.items.length).toBe(1);
    });
  });

  describe('Remove Course', () => {
    it('should remove course', () => {
      const action = CoursesActions.RemoveCourse({ id: '7' });
      const result = reducer(
        {
          isCoursesFetched: true,
          items: mockCourses,
        },
        action,
      );

      expect(result).toEqual({
        isCoursesFetched: true,
        items: [],
      });
    });
  });

  describe('Update Course', () => {
    it('should update course', () => {
      const newCourse = new Course('796', 'New course', new Date(2016, 7, 6), 'Test description', 95, false);
      const action = CoursesActions.UpdateCourse({ id: '7', value: newCourse });
      const result = reducer(
        {
          isCoursesFetched: true,
          items: mockCourses,
        },
        action,
      );

      expect(result.items).toEqual([newCourse]);
    });
  });
});
