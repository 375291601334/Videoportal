import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CoursesPageComponent } from './courses.page';
import { By } from '@angular/platform-browser';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearch once search event emits', () => {
    spyOn(component, 'onSearch');
    fixture.debugElement.query(By.css('app-search-bar')).triggerEventHandler('search', 'test');

    expect(component.onSearch).toHaveBeenCalledWith('test');
  });

  it('should change searchTerm once onSearch have been called', () => {
    component.searchTerm = '';
    component.onSearch('text');

    expect(component.searchTerm).toEqual('text');
  });
});
