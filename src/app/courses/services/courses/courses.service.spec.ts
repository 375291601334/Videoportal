import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoursesService } from './courses.service';

import { Course } from '../../models/course.model';

describe('CoursesService', () => {
  let httpTestingController: HttpTestingController;
  let service: CoursesService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CoursesService);
  });

  afterEach(async() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request when add new course', () => {
    const mockCourse = new Course('', 'Course 1', new Date(2018, 9, 5), 'Course description', 234, false, [{ id: '0', name: 'Tom White' }]);

    service.addCourse(mockCourse)
      .subscribe(course => {
        expect(course).toEqual(mockCourse);
      });

    const req = httpTestingController.expectOne('https://videoportal-app.herokuapp.com/courses');

    expect(req.request.method).toEqual('POST');

    req.flush(mockCourse);
  });

  it('should send PATCH request when update course', () => {
    const mockCourse = new Course('1234', 'Course', new Date(2018, 9, 5), 'Description', 234, false, [{ id: '0', name: 'Tom White' }]);

    service.updateCourse(mockCourse)
      .subscribe(course => {
        expect(course).toEqual(mockCourse);
      });

    const req = httpTestingController.expectOne('https://videoportal-app.herokuapp.com/courses');

    expect(req.request.method).toEqual('PATCH');

    req.flush(mockCourse);
  });

  it('should send DELETE request when delete course', () => {
    const id = '1234';
    const mockCourse = new Course('1234', 'Course', new Date(2018, 9, 5), 'Description', 234, false, [{ id: '0', name: 'Tom White' }]);

    service.deleteCourse(id)
      .subscribe(course => {
        expect(course).toEqual(mockCourse);
      });

    const req = httpTestingController.expectOne(`https://videoportal-app.herokuapp.com/courses/${id}`);

    expect(req.request.method).toEqual('DELETE');

    req.flush(mockCourse);
  });

  it('should send GET request when get courses', () => {
    const mockCourses = [
      {
        id: 1,
        name: 'Course 1',
        date: '2017-09-28T04:39:24+00:00',
        description: 'Description',
        length: 78,
        isTopRated: false,
        authors: [{ id: '0', name: 'Tom White' }],
      },
      {
        id: 2,
        name: 'Course 2',
        date: '2019-03-08T04:39:24+00:00',
        description: 'Description',
        length: 91,
        isTopRated: true,
        authors: [{ id: '0', name: 'Tom White' }],
      },
    ];

    const mockMappedCourses = [
      {
        id: '1',
        title: 'Course 1',
        date: new Date(2017, 8, 28, 7, 39, 24),
        description: 'Description',
        duration: 78,
        topRated: false,
        authors: [{ id: '0', name: 'Tom White' }],
      },
      {
        id: '2',
        title: 'Course 2',
        date: new Date(2019, 2, 8, 7, 39, 24),
        description: 'Description',
        duration: 91,
        topRated: true,
        authors: [{ id: '0', name: 'Tom White' }],
      },
    ];

    service.getCourses('start=0&count=2')
      .subscribe(courses => {
        expect(courses).toEqual(mockMappedCourses);
      });

    const req = httpTestingController.expectOne('https://videoportal-app.herokuapp.com/courses?start=0&count=2');

    expect(req.request.method).toEqual('GET');

    req.flush(mockCourses);
  });

  it('should send GET request when get course', () => {
    const id = '1';

    const mockCourse = {
      id: 1,
      name: 'Course 1',
      date: '2017-09-28T04:39:24+00:00',
      description: 'Description',
      length: 78,
      isTopRated: false,
      authors: [{ id: '0', name: 'Tom White' }],
    };

    const mockMappedCourse = {
      id: '1',
      title: 'Course 1',
      date: new Date(2017, 8, 28, 7, 39, 24),
      description: 'Description',
      duration: 78,
      topRated: false,
      authors: [{ id: '0', name: 'Tom White' }],
    };

    service.getCourse(id)
      .subscribe(course => {
        expect(course).toEqual(mockMappedCourse);
      });

    const req = httpTestingController.expectOne(`https://videoportal-app.herokuapp.com/courses/${id}`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockCourse);
  });

  it('should send GET request when get authors', () => {
    const mockAuthors = [
      {
        id: '1370',
        name: 'Polly Sosa',
      },
      {
        id: '8413',
        name: 'Greta Richardson',
      },
      {
        id: '7458',
        name: 'Deana Bruce',
      },
    ];

    service.getAuthors()
      .subscribe(authors => {
        expect(authors).toEqual(mockAuthors);
      });

    const req = httpTestingController.expectOne('https://videoportal-app.herokuapp.com/authors');

    expect(req.request.method).toEqual('GET');

    req.flush(mockAuthors);
  });
});
