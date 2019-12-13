import { reducer, CoursesState } from '../courses';
import * as CoursesActions from '../../actions/courses';

import { ICourse, Course } from '../../../courses/models/course.model';

describe('CoursesReducer', () => {
  const initialState: CoursesState = {
    isCoursesFetching: false,
    start: 0,
    count: 4,
    sort: '',
    textFragment: '',
    items: [],
    authors: [],
  };

  const mockCourses = [
    new Course('7', 'Test course', new Date(2018, 7, 4), 'Test description', 58, true),
  ];

  const mockAuthors = [
    { id: '1', name: 'Adam Black' },
  ];

  describe('Undefined Action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('Fetch Courses', () => {
    it('should change isCoursesFetching to true', () => {
      const action = CoursesActions.FetchCourses({ query: 'start=0&count=4' });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isCoursesFetching: true,
      });
    });
  });

  describe('Fetch Courses Success', () => {
    it('should return fetched courses', () => {
      const action = CoursesActions.FetchCoursesSuccess({ courses: mockCourses });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isCoursesFetching: false,
        items: mockCourses,
      });
    });
  });

  describe('Clear Courses', () => {
    it('should clear fetched courses', () => {
      const action = CoursesActions.ClearCourses();
      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('Fetch Authors Success', () => {
    it('should return fetched authors', () => {
      const action = CoursesActions.FetchAuthorsSuccess({ authors: mockAuthors });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        authors: mockAuthors,
      });
    });
  });

  describe('Change Search Term', () => {
    it('should change search term', () => {
      const term = 'test';
      const action = CoursesActions.ChangeSearchTerm({ term });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        textFragment: term,
      });
    });
  });

  describe('Change Sort Field', () => {
    it('should change sort field', () => {
      const sort = 'name';
      const action = CoursesActions.ChangeSortField({ sort });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        sort,
      });
    });
  });

  describe('Change Courses Count', () => {
    it('should change search term', () => {
      const count = 7;
      const action = CoursesActions.ChangeCoursesCount({ count });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        count,
      });
    });
  });
});
