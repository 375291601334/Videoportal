import { createAction, props } from '@ngrx/store';

import { ICourse } from 'src/app/courses/models/course.model';

export const FetchCourses = createAction(
  '[Courses] Fetch Courses',
);

export const FetchCoursesSuccess = createAction(
  '[Courses] Fetch Courses Success',
  props<{ courses: ICourse[] }>(),
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
  props<{ id: string }>(),
);
