import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesListComponent } from './courses-list.component';
import { FilterPipe } from '../../pipes/filter/filter.pipe';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListComponent, FilterPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should console log once clicking LOAD MORE', () => {
    spyOn(console, 'log');

    fixture.debugElement.query(By.css('.load-more-block')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('Loading more courses...');
  });

  it('should console log once clicking NO DATA, FEEL FREE TO ADD NEW COURSE', () => {
    component.courses = [];
    fixture.detectChanges();
    spyOn(console, 'log');

    fixture.debugElement.query(By.css('.add-course-block')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('Adding new course...');
  });

  it('should console log once deleting course', () => {
    const courseId = 3;
    spyOn(console, 'log');

    fixture.debugElement.query(By.css('app-course-card')).triggerEventHandler('deleteCourse', courseId);
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('Deleting course with id=3!!!');
  });
});
