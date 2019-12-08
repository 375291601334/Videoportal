import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';

import { LoginPageComponent } from './login.page';

import { AuthState } from '../../../store/reducers/auth';

const initialState = {
  auth: {
    isUserAuthentificated: false,
    user: {
      id: '',
      firstName: '',
      lastName: '',
    },
    token: '',
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
