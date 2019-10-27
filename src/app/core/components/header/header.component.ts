import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';

import { MenuComponent } from '../menu/menu.component';
import { MenuDirective } from '../../directives/menu.directive';

import { IUser, User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MenuDirective, {static: true}) public adHost: MenuDirective;

  user: IUser;

  constructor(
    private factoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    this.user = new User('0', 'User', 'Name');
  }

  openMenu() {
    const componentFactory = this.factoryResolver.resolveComponentFactory(MenuComponent);

    const viewContainerRef: any = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef: any = viewContainerRef.createComponent(componentFactory);
    (<MenuComponent>componentRef.instance).user = this.user;

    (<MenuComponent>componentRef.instance).closeMenu.subscribe(() => {
      componentRef.destroy();
    });
  }
}
