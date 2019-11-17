import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CoursesService } from '../../services/courses.service';

import { CoursesListComponent } from './courses-list.component';

import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { OrderByPipe } from '../../pipes/order-by/order-by.pipe';

import { Course } from '../../models/course.model';

class MockCoursesService {
  getCourses() {
    return [new Course(
      '0',
      'Javascript',
      new Date(2019, 10, 9),
      'Learn about where you can find course descriptions, what information they include, ' +
        'how they work, and details about various components of a course description. Course ' +
        'descriptions report information about a university or college\'s classes. They\'re published ' +
        'both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.',
      807,
      true,
    ),
    new Course(
      '1',
      'Programming: Angular',
      new Date(2019, 9, 29),
      'Learn about where you can find course descriptions, what information they include, ' +
        'how they work, and details about various components of a course description. Course ' +
        'descriptions report information about a university or college\'s classes. They\'re published ' +
        'both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.',
      18,
    ),
    new Course(
      '2',
      'Python',
      new Date(2018, 10, 9),
      'Learn about where you can find course descriptions, what information they include, ' +
        'how they work, and details about various components of a course description. Course ' +
        'descriptions report information about a university or college\'s classes. They\'re published ' +
        'both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.',
      109,
      true,
    ),
    new Course(
      '2',
      'Programming: C#',
      new Date(2018, 10, 9),
      'Learn about where you can find course descriptions, what information they include, ' +
        'how they work, and details about various components of a course description. Course ' +
        'descriptions report information about a university or college\'s classes. They\'re published ' +
        'both in course catalogs that outline degree requirements and in course schedules that contain ' +
        'descriptions for all courses offered during a particular semester.',
      60,
      true,
    )];
  }

  getCourse() {}

  createCourse() {}

  removeCourse() {}
}

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesService: CoursesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      providers: [
        FilterPipe,
        OrderByPipe,
        { provide: CoursesService, useClass: MockCoursesService },
      ],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.get(CoursesService);
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

  it('should add new course once clicking NO DATA, FEEL FREE TO ADD NEW COURSE', () => {
    component.courses = [];
    component.filteredCourses = [];
    fixture.detectChanges();
    spyOn(coursesService, 'createCourse');

    fixture.debugElement.query(By.css('.add-course-block')).triggerEventHandler('click', null);
    expect(coursesService.createCourse).toHaveBeenCalled();
  });

  it('should call onSortingSelect when select Duration order', () => {
    const selectedOrder = { name: 'Duration', prop: 'duration', isDesc: false };
    spyOn(component, 'onSortingSelect');

    fixture.debugElement.query(By.css('select')).triggerEventHandler('ngModelChange', selectedOrder);
    fixture.detectChanges();

    expect(component.onSortingSelect).toHaveBeenCalledWith(selectedOrder);
  });

  it('should change filteredCourses order once onSortingSelect', () => {
    component.filteredCourses = [
      { id: '0', title: '', date: new Date(2019, 10, 5), description: '', duration: 49, topRated: false },
      { id: '1', title: '', date: new Date(2019, 10, 5), description: '', duration: 19, topRated: false },
    ];
    const selectedOrder = { name: 'Duration', prop: 'duration', isDesc: false };
    component.onSortingSelect(selectedOrder);

    fixture.detectChanges();

    expect(component.filteredCourses).toEqual([
      { id: '1', title: '', date: new Date(2019, 10, 5), description: '', duration: 19, topRated: false },
      { id: '0', title: '', date: new Date(2019, 10, 5), description: '', duration: 49, topRated: false },
    ]);
  });
});

@Component({
  template: '<app-courses-list [searchTerm]="searchTerm"></app-courses-list>',
})
class TestHostComponent {
  searchTerm = '';
}

describe('CoursesListComponent: Host testing', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        CoursesListComponent,
      ],
      providers: [FilterPipe, OrderByPipe],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnChanges should be called when searchTerm changed', () => {
    component.searchTerm = 'test';
    const coursesListComponent = fixture.debugElement.query(By.css('app-courses-list')).componentInstance;
    spyOn(coursesListComponent, 'ngOnChanges');

    fixture.detectChanges();
    expect(coursesListComponent.ngOnChanges).toHaveBeenCalled();
  });
});
