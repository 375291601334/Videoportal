import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICourse } from '../../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  private mapCourse(course: any): ICourse {
    return {
      id: course.id.toString(),
      title: course.name,
      date: new Date(course.date),
      description: course.description,
      duration: course.length,
      topRated: course.isTopRated,
      authors: course.authors,
    };
  }

  getCourses(query: string) {
    return this.http.get(`https://videoportal-app.herokuapp.com/courses?${query}`)
      .pipe(
        map((courses: any[]) => courses.map(
          course => this.mapCourse(course),
        )),
      );
  }

  getAuthors(): Observable<{ id: string, name: string, lastName: string }[]> {
    return this.http.get<{ id: string, name: string, lastName: string }[]>('https://videoportal-app.herokuapp.com/authors');
  }

  getCourse(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(`https://videoportal-app.herokuapp.com/courses/${id}`)
      .pipe(
        map((course: any) => this.mapCourse(course)),
      );
  }

  addCourse(course: ICourse) {
    return this.http.post(
      'https://videoportal-app.herokuapp.com/courses',
      {
        id: Math.random().toString(36).substr(2, 9),
        name: course.title,
        date: course.date,
        length: course.duration,
        description: course.description,
        authors: course.authors,
        isTopRated: course.topRated,
      },
    );
  }

  updateCourse(course: ICourse) {
    return this.http.patch(
      'https://videoportal-app.herokuapp.com/courses',
      {
        id: +course.id,
        name: course.title,
        date: course.date,
        length: course.duration,
        description: course.description,
        authors: course.authors,
        isTopRated: course.topRated,
      },
    );
  }

  deleteCourse(id: string) {
    return this.http.delete(`https://videoportal-app.herokuapp.com/courses/${id}`);
  }
}
