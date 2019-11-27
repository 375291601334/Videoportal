import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { LoginPageComponent } from './login.page';

const initialState = {
  auth: {
    isUserAuthentificated: false,
    user: {
      id: '',
      firstName: '',
      lastName: '',
    },
  },
};

class MockRouter {
  navigate() {}
}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useClass: MockRouter },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login and redirect to courses page once logging in', () => {
    spyOn(router, 'navigate');

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
