import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuDirective } from '../../directives/menu.directive';

import { User } from '../../models/user.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, MenuDirective, MenuComponent],
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
        user: null,
        closeMenu: new EventEmitter(),
      },
      destroy: () => {},
    };

    component.user = new User('0', 'User', 'Name');
    spyOn(menu, 'destroy');
    component.menuInit(menu);

    expect(menu.instance.user).toEqual(component.user);

    menu.instance.closeMenu.emit();
    expect(menu.destroy).toHaveBeenCalled();
  });
});
