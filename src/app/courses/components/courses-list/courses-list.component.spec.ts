import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CoursesListComponent } from './courses-list.component';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { OrderByPipe } from '../../pipes/order-by/order-by.pipe';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      providers: [FilterPipe, OrderByPipe],
      imports: [FormsModule],
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
    component.filteredCourses = [];
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

// @Component({
//   template: '<app-courses-list [searchTerm]="searchTerm"></app-courses-list>',
// })
// class TestHostComponent {
//   searchTerm = '';
// }

// describe('CoursesListComponent: Host testing', () => {
//   let component: TestHostComponent;
//   let fixture: ComponentFixture<TestHostComponent>;
//   let filter: Partial<FilterPipe>;

//   filter = {
//     transform: () => {},
//   };

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         TestHostComponent,
//         CoursesListComponent,
//       ],
//       providers: [{provide: FilterPipe, useValue: filter }, OrderByPipe],
//       imports: [FormsModule],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TestHostComponent);
//     component = fixture.componentInstance;
//     filter = TestBed.get(FilterPipe);
//     fixture.detectChanges();
//   });

//   it('ngOnChanges should filter courses', () => {
//     component.searchTerm = 'test';
//     const coursesListComponent = fixture.debugElement.query(By.css('app-courses-list')).nativeElement;

//     fixture.detectChanges();
//     expect(filter).toHaveBeenCalled();
//   });
// });
