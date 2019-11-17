import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { AuthService } from '../../../login/services/auth.service';

import { HeaderComponent } from './header.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuDirective } from '../../directives/menu.directive';

import { User } from '../../models/user.model';

let isUserAuthentificated = false;

class MockAuthService {
  logout() {}
  login() {}
  isUserAuthentificated() { return isUserAuthentificated; }
  getUserInfo() { return {id: '0', firstName: 'Anastasiya', lastName: 'Hushcha'}; }
}

class MockRouter {
  navigate() {}
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, MenuDirective, MenuComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
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
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
        isUserAuthentificated: false,
        user: null,
        login: new EventEmitter(),
        logout: new EventEmitter(),
        closeMenu: new EventEmitter(),
      },
      destroy: () => {},
    };

    component.user = new User('1', 'Anastasiya', 'Hushcha');
    component.isUserAuthentificated = true;
    spyOn(menu, 'destroy');
    spyOn(authService, 'logout');
    spyOn(router, 'navigate');
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
    expect(authService.logout).toHaveBeenCalled();

  });

  it('should render Login button if user is not authentificated', () => {
    isUserAuthentificated = false;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.log-in'))).toBeTruthy();
  });

  it('should render user info block if user is authentificated', () => {
    isUserAuthentificated = true;
    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('.autorization-section>div'))[0].nativeElement.innerText,
    ).toMatch('Anastasiya Hushcha');
  });

  it('should get user info if user is authentificated', () => {
    spyOn(authService, 'getUserInfo');

    isUserAuthentificated = true;
    component.ngAfterContentChecked();

    expect(authService.getUserInfo).toHaveBeenCalled();
  });

  it('should redirect to login page after clicking login', () => {
    isUserAuthentificated = false;
    fixture.detectChanges();

    spyOn(router, 'navigate');

    fixture.debugElement.query(By.css('.log-in')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should call authService.logout once logging off', () => {
    isUserAuthentificated = true;
    fixture.detectChanges();

    spyOn(authService, 'logout');

    fixture.debugElement.query(By.css('.log-off')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(authService.logout).toHaveBeenCalled();
  });
});
