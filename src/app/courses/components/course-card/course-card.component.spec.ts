import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CourseCardComponent } from './course-card.component';

import { TimePipe } from '../../pipes/time.pipe';

import { Course } from '../../models/course.model';

@Component({
  template: '<app-course-card [course]="course" (deleteCourse)="deleteCourse($event)"></app-course-card>',
})
class TestHostComponent {
  course = new Course('', '', new Date(), '', 0);
}

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseCardComponent,
        TimePipe,
        TestHostComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    component.course = new Course('1', 'Title', new Date(), '...', 543);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should console log end emit deleteCourse once deleting course', () => {
    component.course.id = '3';

    spyOn(console, 'log');
    spyOn(component.deleteCourse, 'emit');

    fixture.debugElement.query(By.css('.delete-button')).triggerEventHandler('click', null);
    expect(console.log).toHaveBeenCalledWith('Delete');
    expect(component.deleteCourse.emit).toHaveBeenCalledWith('3');
  });

  it('should console log once editing course', () => {
    spyOn(console, 'log');

    fixture.debugElement.query(By.css('.edit-button')).triggerEventHandler('click', null);
    expect(console.log).toHaveBeenCalledWith('Edit');
  });

  it('ngOnChanges should console log "OnChanges"', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const testHostComponent = testHostFixture.componentInstance;
    spyOn(console, 'log');
    testHostComponent.course = new Course('2', 'New Name', new Date(44643665), 'New text', 5543);

    testHostFixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('OnChanges');
  });
});
