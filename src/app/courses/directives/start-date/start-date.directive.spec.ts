import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StartDateDirective } from './start-date.directive';

@Component({
  template: `<div [appStartDate]="startDate"></div>`,
})
class TestComponent {
  startDate: Date = new Date();
}

describe('StartDateDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let div: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartDateDirective, TestComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    div = fixture.debugElement.query(By.directive(StartDateDirective));
  });

  it('should add blue border', () => {
    component.startDate = new Date(2922, 11, 3);
    fixture.detectChanges();

    const border = div.nativeElement.style.border;
    expect(border).toBe('1px solid blue');
  });

  it('should add green border', () => {
    component.startDate.setDate((new Date()).getDate() - 13);
    fixture.detectChanges();

    const border = div.nativeElement.style.border;
    expect(border).toBe('1px solid green');
  });

  it('should not add border', () => {
    component.startDate = new Date(2005, 10, 1);
    fixture.detectChanges();

    const border = div.nativeElement.style.border;
    expect(border).toBeFalsy();
  });
});
