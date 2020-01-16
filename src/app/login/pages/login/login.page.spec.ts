import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { LoginPageComponent } from './login.page';

import { AuthState } from '../../../store/reducers/auth';

const initialState = {
  auth: {
    isUserAuthentificated: false,
    isUserAuthentificating: false,
    isAuthentificationFailed: false,
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
      imports: [
        ReactiveFormsModule,
        TranslateTestingModule
          .withTranslations('en', require('../../../../assets/i18n/en.json'))
          .withTranslations('ru', require('../../../../assets/i18n/ru.json')),
      ],
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
    component.loginForm = new FormGroup({
      email: new FormControl('test'),
      password: new FormControl('test'),
    });
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login action once calling onLogin', () => {
    spyOn(store, 'dispatch');

    component.onLogin();
    expect(store.dispatch).toHaveBeenCalled();
  });
});
