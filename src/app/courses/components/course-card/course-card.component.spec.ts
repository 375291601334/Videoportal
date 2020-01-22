import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { CourseCardComponent } from './course-card.component';
import { TimePipe } from '../../../shared/pipes/time/time.pipe';
import { StartDateDirective } from '../../directives/start-date/start-date.directive';

import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseCardComponent,
        TimePipe,
        StartDateDirective,
      ],
      imports: [
        TranslateTestingModule
          .withTranslations('en', require('../../../../assets/i18n/en.json'))
          .withTranslations('ru', require('../../../../assets/i18n/ru.json')),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    component.course = new Course('2', 'Programming: C#', new Date(2018, 10, 9), '...', 60, false, []);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit editCourse once click Edit', () => {
    spyOn(component.editCourse, 'emit');

    fixture.debugElement.query(By.css('.edit-button')).triggerEventHandler('click', null);
    expect(component.editCourse.emit).toHaveBeenCalledWith(component.course.id);
  });

  it('should emit deleteCourse once click Delete', () => {
    spyOn(component.deleteCourse, 'emit');

    fixture.debugElement.query(By.css('.delete-button')).triggerEventHandler('click', null);
    expect(component.deleteCourse.emit).toHaveBeenCalledWith(component.course);
  });
});
