import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NewCoursePageComponent } from './new-course.page';
import { provideMockStore } from '@ngrx/store/testing';

class MockRouter {
  navigate() {}
}

const initialState = {
  courses: [],
};

describe('NewCoursePageComponent', () => {
  let component: NewCoursePageComponent;
  let fixture: ComponentFixture<NewCoursePageComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewCoursePageComponent],
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

  it('should return to main page once clicking Save button', () => {
    spyOn(router, 'navigate');

    fixture.debugElement.queryAll(By.css('button'))[1].triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
