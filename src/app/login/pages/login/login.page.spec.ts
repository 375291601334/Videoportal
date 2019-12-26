import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';

import { LoginPageComponent } from './login.page';

import { AuthState } from '../../../store/reducers/auth';

const initialState = {
  auth: {
    isUserAuthentificated: false,
    isUserAuthentificating: false,
    token: '',
  },
  user: {
    isUserInfoLoading: false,
    userInfo: {
      id: '',
      firstName: '',
      lastName: '',
    },
  },
};

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: MockStore<AuthState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [FormsModule],
      providers: [
        provideMockStore({ initialState }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login action once clicking login', () => {
    spyOn(store, 'dispatch');

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
