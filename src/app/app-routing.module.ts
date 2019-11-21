import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesPageComponent } from './courses/pages/courses/courses.page';
import { NotFoundPageComponent } from './core/pages/not-found/not-found.page';
import { LoginPageComponent } from './login/pages/login/login.page';
import { NewCoursePageComponent } from './courses/pages/new-course/new-course.page';

const routes: Routes = [
  {
    path: 'courses',
    children: [
      {
        path: '',
        component: CoursesPageComponent,
      },
      {
        path: 'new',
        component: NewCoursePageComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
