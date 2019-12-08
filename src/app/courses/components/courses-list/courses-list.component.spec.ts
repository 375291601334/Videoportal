import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoursesService } from '../../services/courses/courses.service';

import { CoursesState } from '../../../store/reducers/courses';

import { CoursesListComponent } from './courses-list.component';

import { FilterPipe } from '../../../shared/pipes/filter/filter.pipe';
import { OrderByPipe } from '../../../shared/pipes/order-by/order-by.pipe';

import { Course } from '../../models/course.model';

class MockRouter {
  navigate() {}
}

describe('CoursesListComponent', () => {
  const initialState = {
    courses: {
      isCoursesFetched: true,
      items: [
        new Course('0', 'Javascript', new Date(2019, 10, 9), '...', 807, true),
        new Course('1', 'Programming: Angular', new Date(2019, 9, 29), '...', 18),
        new Course('2', 'Python', new Date(2018, 10, 9), '...', 109, true),
        new Course('2', 'Programming: C#', new Date(2018, 10, 9), '...', 60, true),
      ],
    },
    searchTerm: '',
  };

  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesService: CoursesService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      providers: [
        FilterPipe,
        OrderByPipe,
        provideMockStore({ initialState }),
        { provide: Router, useClass: MockRouter },
      ],
      imports: [FormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.get(CoursesService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should delete course once deleting course', () => {
  //   const coursesAmount = component.courses.length;
  //   const course = new Course('0', 'Javascript', new Date(2019, 10, 9), '...', 807, true);

  //   fixture.debugElement.query(By.css('app-course-card')).triggerEventHandler('deleteCourse', course);
  //   fixture.detectChanges();
  //   expect(component.courses.length).toEqual(coursesAmount - 1);
  // });

  it('should redirect to new page once click Edit course', () => {
    spyOn(router, 'navigate');

    fixture.debugElement.query(By.css('app-course-card')).triggerEventHandler('editCourse', null);
    expect(router.navigate).toHaveBeenCalledWith(['courses', null]);
  });

  it('should increase maxCoursesNumber once clicking LOAD MORE', () => {
    const maxCoursesNumber = component.maxCoursesNumber;

    fixture.debugElement.query(By.css('.load-more-block')).triggerEventHandler('click', null);
    expect(component.maxCoursesNumber).toEqual(maxCoursesNumber + 3);
  });

  it('should add new course once clicking NO DATA, FEEL FREE TO ADD NEW COURSE', () => {
    component.courses = [];
    fixture.detectChanges();
    spyOn(router, 'navigate');

    fixture.debugElement.query(By.css('.add-course-block')).triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith(['courses', 'new']);
  });

  it('should call onSortingSelect when select Duration order', () => {
    const selectedOrder = { name: 'Duration', prop: 'duration', isDesc: false };
    spyOn(component, 'onSortingSelect');

    fixture.debugElement.query(By.css('select')).triggerEventHandler('ngModelChange', selectedOrder);
    fixture.detectChanges();

    expect(component.onSortingSelect).toHaveBeenCalledWith(selectedOrder);
  });
});

describe('CoursesListComponent without courses in store:', () => {
  const initialState = {
    courses: {
      isCoursesFetched: false,
      items: [],
    },
    searchTerm: '',
  };

  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesService: CoursesService;
  let router: Router;
  let store: MockStore<CoursesState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      providers: [
        FilterPipe,
        OrderByPipe,
        provideMockStore({ initialState }),
        { provide: Router, useClass: MockRouter },
      ],
      imports: [FormsModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.get(CoursesService);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
  });

  it('should dispatch action if no courses were fetched yet', () => {
    spyOn(store, 'dispatch');
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalled();
  });
});
