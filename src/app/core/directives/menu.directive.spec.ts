import { ViewContainerRef } from "@angular/core";

import { MenuDirective } from './menu.directive';

describe('MenuDirective', () => {
  let viewContainerRef: ViewContainerRef;

  it('should create an instance', () => {
    const directive = new MenuDirective(viewContainerRef);
    expect(directive).toBeTruthy();
  });
});
