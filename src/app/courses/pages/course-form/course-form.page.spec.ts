import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgSelectModule } from '@ng-select/ng-select';

import { CourseFormPageComponent } from './course-form.page';
import { DurationInputComponent } from '../../../shared/components/duration-input/duration-input.component';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { DateInputComponent } from '../../../shared/components/date-input/date-input.component';

import { TimePipe } from '../../../shared/pipes/time/time.pipe';

import { CoursesState } from '../../../store/reducers/courses';
import { Course } from '../../models/course.model';

class MockRouter {
  navigate() {}
}

const initialState = {
  courses: {
    isCoursesFetched: true,
    start: 0,
    count: 4,
    sort: '',
    textFragment: '',
    authors: [],
    items: [
      new Course('0', 'Javascript', new Date(2019, 10, 9), '...', 807, true),
    ],
  },
};

describe('CourseFormPageComponent:', () => {
  describe('New course', () => {
    let component: CourseFormPageComponent;
    let fixture: ComponentFixture<CourseFormPageComponent>;
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let store: MockStore<CoursesState>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CourseFormPageComponent,
          DurationInputComponent,
          MultiSelectComponent,
          DateInputComponent,
          TimePipe,
        ],
        imports: [FormsModule, HttpClientTestingModule, NgSelectModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          provideMockStore({ initialState }),
          { provide: Router, useClass: MockRouter },
          { provide: ActivatedRoute, useValue: {
            snapshot: {
              data: {
                title: 'New course',
              },
            },
          }},
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CourseFormPageComponent);
      component = fixture.componentInstance;
      router = TestBed.get(Router);
      activatedRoute = TestBed.get(ActivatedRoute);
      store = TestBed.get(Store);
      fixture.detectChanges();
    });

    it('should return to main page once clicking Cancel button', () => {
      spyOn(router, 'navigate');

      fixture.debugElement.queryAll(By.css('button'))[0].triggerEventHandler('click', null);
      expect(router.navigate).toHaveBeenCalledWith(['']);
    });

    it('should call addNewCourse method once clicking Save button', () => {
      spyOn(router, 'navigate');
      spyOn(component, 'addNewCourse');

      fixture.debugElement.queryAll(By.css('button'))[1].triggerEventHandler('click', null);
      expect(component.addNewCourse).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['']);
    });

    it('should dispatch action once calling addNewCourse method', () => {
      spyOn(store, 'dispatch');
      component.addNewCourse();
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should dispatch actin once calling addNewCourse method (with few authors)', () => {
      component.authorsElement.options = [{ id: '1', name: 'Adam Black' }];
      spyOn(store, 'dispatch');
      component.addNewCourse();
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('Edit course', () => {
    let component: CourseFormPageComponent;
    let fixture: ComponentFixture<CourseFormPageComponent>;
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let store: MockStore<CoursesState>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CourseFormPageComponent,
          DurationInputComponent,
          MultiSelectComponent,
          DateInputComponent,
          TimePipe,
        ],
        imports: [FormsModule, HttpClientTestingModule, NgSelectModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          provideMockStore({ initialState }),
          { provide: Router, useClass: MockRouter },
          { provide: ActivatedRoute, useValue: {
            snapshot: {
              data: {
                title: 'Edit course',
              },
              params: {
                id: '0',
              },
            },
          }},
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CourseFormPageComponent);
      component = fixture.componentInstance;
      router = TestBed.get(Router);
      activatedRoute = TestBed.get(ActivatedRoute);
      store = TestBed.get(Store);
      fixture.detectChanges();
    });

    it('should get course id from url', () => {
      component.pageTitle = 'Edit course';
      fixture.detectChanges();

      expect(component.title).toEqual('Javascript');
    });

    it('should call updateCourse method once clicking Save button', () => {
      spyOn(router, 'navigate');
      spyOn(component, 'updateCourse');

      fixture.debugElement.queryAll(By.css('button'))[1].triggerEventHandler('click', null);
      expect(component.updateCourse).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['']);
    });

    it('should dispatch action once calling updateCourse method', () => {
      spyOn(store, 'dispatch');
      component.updateCourse();
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should dispatch actin once calling updateCourse method (with few authors)', () => {
      component.authorsElement.options = [{ id: '1', name: 'Adam Black' }];
      spyOn(store, 'dispatch');
      component.updateCourse();
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  // describe('Edit non-existing course', () => {
  //   let component: CourseFormPageComponent;
  //   let fixture: ComponentFixture<CourseFormPageComponent>;
  //   let router: Router;
  //   let activatedRoute: ActivatedRoute;
  //   let store: MockStore<CoursesState>;

  //   beforeEach(async(() => {
  //     TestBed.configureTestingModule({
  //       declarations: [
  //         CourseFormPageComponent,
  //         DurationInputComponent,
  //         MultiSelectComponent,
  //         DateInputComponent,
  //         TimePipe,
  //       ],
  //       imports: [FormsModule, HttpClientTestingModule, NgSelectModule],
  //       schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //       providers: [
  //         provideMockStore({ initialState: {
  //           ...initialState,
  //           items: [],
  //         } }),
  //         { provide: Router, useClass: MockRouter },
  //         { provide: ActivatedRoute, useValue: {
  //           snapshot: {
  //             data: {
  //               title: 'Edit course',
  //             },
  //             params: {
  //               id: '5654',
  //             },
  //           },
  //         }},
  //       ],
  //     }).compileComponents();
  //   }));

  //   beforeEach(() => {
  //     fixture = TestBed.createComponent(CourseFormPageComponent);
  //     component = fixture.componentInstance;
  //     router = TestBed.get(Router);
  //     activatedRoute = TestBed.get(ActivatedRoute);
  //     store = TestBed.get(Store);
  //     fixture.detectChanges();
  //   });

  //   it('should not get course by non-existing id', () => {
  //     component.pageTitle = 'Edit course';
  //     fixture.detectChanges();

  //     expect(component.title).toEqual('');
  //   });
  // });
});
