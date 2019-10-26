import { async, TestBed } from '@angular/core/testing';

import { MenuDirective } from './menu.directive';
import { ViewContainerRef, Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `<ng-template appMenu></ng-template>`,
})
class ParentComponent {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

describe('MenuDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParentComponent],
    })
    .compileComponents();
  }));

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(ParentComponent);
    const directive = new MenuDirective(fixture.componentInstance.viewContainerRef);
    expect(directive).toBeTruthy();
  });
});
