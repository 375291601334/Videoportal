import { createAction, props } from '@ngrx/store';

import { ICourse } from 'src/app/courses/models/course.model';

export const ChangeSearchTerm = createAction(
  '[Search] Change Search Term',
  props<{ term: string }>(),
);

export const ChangeSortField = createAction(
  '[Sort] Change Sort Field',
  props<{ sort: string }>(),
);

export const ChangeCoursesCount = createAction(
  '[Count] Change CoursesCount',
  props<{ count: number }>(),
);

export const FetchCourses = createAction(
  '[Courses] Fetch Courses',
  props<{ query: string }>(),
);

export const FetchCoursesSuccess = createAction(
  '[Courses] Fetch Courses Success',
  props<{ courses: ICourse[] }>(),
);

export const FetchCourse = createAction(
  '[Course] Fetch Course',
  props<{ id: string }>(),
);

export const ClearCourses = createAction(
  '[Courses] Clear Courses',
);

export const FetchAuthors = createAction(
  '[Authors] Fetch Authors',
);

export const FetchAuthorsSuccess = createAction(
  '[Authors] Fetch Authors Success',
  props<{ authors: { id: string, name: string }[] }>(),
);

export const AddNewCourse = createAction(
  '[Courses] Add New Course',
  props<{ course: ICourse }>(),
);

export const RemoveCourse = createAction(
  '[Courses] Remove Course',
  props<{ id: string }>(),
);

export const UpdateCourse = createAction(
  '[Courses] Update Course',
  props<{ course: ICourse }>(),
);
