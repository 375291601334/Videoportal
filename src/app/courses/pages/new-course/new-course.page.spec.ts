import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';

import { NewCoursePageComponent } from './new-course.page';
import { DurationInputComponent } from '../../../shared/components/duration-input/duration-input.component';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { DateInputComponent } from '../../../shared/components/date-input/date-input.component';

import { TimePipe } from '../../../shared/pipes/time/time.pipe';

import { Course } from '../../models/course.model';

class MockRouter {
  navigate() {}
}

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
};

describe('NewCoursePageComponent', () => {
  let component: NewCoursePageComponent;
  let fixture: ComponentFixture<NewCoursePageComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewCoursePageComponent,
        DurationInputComponent,
        MultiSelectComponent,
        DateInputComponent,
        TimePipe,
      ],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useClass: MockRouter },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCoursePageComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return to main page once clicking Cancel button', () => {
    spyOn(router, 'navigate');

    fixture.debugElement.queryAll(By.css('button'))[0].triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  // it('should return to main page once clicking Save button', () => {
  //   spyOn(router, 'navigate');

  //   fixture.debugElement.queryAll(By.css('button'))[1].triggerEventHandler('click', null);
  //   expect(router.navigate).toHaveBeenCalledWith(['']);
  // });
});
