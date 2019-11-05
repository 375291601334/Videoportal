import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MenuComponent } from './menu.component';

import { User } from '../../models/user.model';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    component.user = new User('0', 'User', 'Name');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close menu once clicked', () => {
    spyOn(component.closeMenu, 'emit');

    fixture.debugElement.query(By.css('.close-section')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.closeMenu.emit).toHaveBeenCalled();
  });

  it('should console log once logging off', () => {
    spyOn(console, 'log');

    fixture.debugElement.query(By.css('.log-off')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('logging off');
  });
});
