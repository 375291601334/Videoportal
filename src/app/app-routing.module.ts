import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesPageComponent } from './courses/pages/courses/courses.page';
import { NotFoundPageComponent } from './core/pages/not-found/not-found.page';
import { LoginPageComponent } from './login/pages/login/login.page';
import { CourseFormPageComponent } from './courses/pages/course-form/course-form.page';

import { AuthGuard } from './login/services/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    children: [
      {
        path: '',
        component: CoursesPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'new',
        component: CourseFormPageComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'New course',
        },
      },
      {
        path: ':id',
        component: CourseFormPageComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Edit course',
        },
      },
    ],
  },
  {
    path: 'login',
    component: LoginPageComponent,
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
