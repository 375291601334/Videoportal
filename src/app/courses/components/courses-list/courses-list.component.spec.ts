import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoursesState } from '../../../store/reducers/courses';

import { CoursesListComponent } from './courses-list.component';

import { Course } from '../../models/course.model';

class MockRouter {
  navigate() {}
}

describe('CoursesListComponent', () => {
  const initialState = {
    courses: {
      isCoursesFetched: true,
      start: 0,
      count: 4,
      sort: '',
      textFragment: '',
      authors: [],
      items: [
        new Course('0', 'Javascript', new Date(2019, 10, 9), '...', 807, true, []),
        new Course('1', 'Programming: Angular', new Date(2019, 9, 29), '...', 18, false, []),
        new Course('2', 'Python', new Date(2018, 10, 9), '...', 109, true, []),
        new Course('2', 'Programming: C#', new Date(2018, 10, 9), '...', 60, true, []),
      ],
    },
  };

  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let store: MockStore<CoursesState>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      providers: [
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
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  it('should dispatch action once called onSortingSelect', () => {
    spyOn(store, 'dispatch');

    component.onSortingSelect({ name: 'Title', prop: 'name' });

    expect(store.dispatch).toHaveBeenCalled();
  });
});

describe('CoursesListComponent without courses in store:', () => {
  const initialState = {
    courses: {
      isCoursesFetched: false,
      start: 0,
      count: 4,
      sort: 'name',
      textFragment: 'test',
      authors: [],
      items: [],
    },
    searchTerm: '',
  };

  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let router: Router;
  let store: MockStore<CoursesState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      providers: [
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
    router = TestBed.get(Router);
    store = TestBed.get(Store);
  });

  it('should dispatch action if no courses were fetched yet', () => {
    spyOn(store, 'dispatch');
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalled();
  });
});
