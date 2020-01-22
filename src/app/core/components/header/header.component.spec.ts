import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { FormsModule } from '@angular/forms';

import { AuthState } from '../../../store/reducers/auth';
import { UserState } from '../../../store/reducers/user';

import { HeaderComponent } from './header.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuDirective } from '../../directives/menu/menu.directive';

class MockRouter {
  navigate() {}
}

describe('HeaderComponent: Authentificated', () => {
  const initialState = {
    auth: {
      isUserAuthentificated: true,
      isUserAuthentificating: false,
      token: '123',
    },
    user: {
      isUserInfoLoading: false,
      userInfo: {
        id: '1',
        firstName: 'First',
        lastName: 'Name',
      },
    },
  };

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let store: MockStore<AuthState | UserState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, MenuDirective, MenuComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useClass: MockRouter },
      ],
      imports: [
        FormsModule,
        TranslateTestingModule
          .withTranslations('en', require('../../../../assets/i18n/en.json'))
          .withTranslations('ru', require('../../../../assets/i18n/ru.json')),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [MenuComponent],
      },
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should open menu once clicking', () => {
    spyOn(component, 'openMenu');

    fixture.debugElement.query(By.css('.mobile-autorization-section img')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.openMenu).toHaveBeenCalled();
  });

  it('should create menu component', () => {
    spyOn(component.adHost.viewContainerRef, 'createComponent');
    component.menuInit = () => {};
    component.openMenu();

    expect(component.adHost.viewContainerRef.createComponent).toHaveBeenCalled();
  });

  it('should initialize menu component', () => {
    const menu = {
      instance: {
        isUserAuthentificated: component.isUserAuthentificated,
        user: component.user,
        login: new EventEmitter(),
        logout: new EventEmitter(),
        closeMenu: new EventEmitter(),
      },
      destroy: () => {},
    };

    spyOn(menu, 'destroy');
    spyOn(router, 'navigate');
    spyOn(component, 'onLogout');
    component.menuInit(menu);

    expect(menu.instance.user).toEqual(component.user);
    expect(menu.instance.isUserAuthentificated).toEqual(component.isUserAuthentificated);

    menu.instance.closeMenu.emit();
    expect(menu.destroy).toHaveBeenCalled();

    menu.instance.login.emit();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
    expect(menu.destroy).toHaveBeenCalled();

    menu.instance.logout.emit();
    fixture.detectChanges();
    expect(component.onLogout).toHaveBeenCalled();
  });

  it('should render user info block if user is authentificated', () => {
    expect(
      fixture.debugElement.queryAll(By.css('.autorization-section>div'))[0].nativeElement.innerText,
    ).toMatch('First Name');
  });

  it('should get user info if user is authentificated', () => {
    expect(component.user).toEqual({ id: '1', firstName: 'First', lastName: 'Name' });
  });

  it('should logout and redirect to login page after clicking logout', () => {
    spyOn(store, 'dispatch');
    spyOn(router, 'navigate');
    component.onLogout();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});

describe('HeaderComponent: Nonauthentificated', () => {
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

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, MenuDirective, MenuComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useClass: MockRouter },
      ],
      imports: [
        FormsModule,
        TranslateTestingModule
          .withTranslations('en', require('../../../../assets/i18n/en.json'))
          .withTranslations('ru', require('../../../../assets/i18n/ru.json')),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should redirect to login page after clicking login', () => {
    spyOn(router, 'navigate');
    fixture.debugElement.query(By.css('.log-in')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
