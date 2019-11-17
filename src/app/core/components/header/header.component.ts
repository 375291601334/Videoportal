import { Component, AfterContentChecked, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/login/services/auth.service';

import { MenuComponent } from '../menu/menu.component';
import { MenuDirective } from '../../directives/menu.directive';

import { IUser, User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterContentChecked {
  @ViewChild(MenuDirective, {static: true}) public adHost: MenuDirective;

  user: IUser;
  isUserAuthentificated: boolean;

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private router: Router,
    private auth: AuthService,
  ) {}

  ngAfterContentChecked() {
    this.isUserAuthentificated = this.auth.isUserAuthentificated();

    if (this.isUserAuthentificated) {
      this.user = this.auth.getUserInfo();
    }
  }

  openMenu() {
    const componentFactory = this.factoryResolver.resolveComponentFactory(MenuComponent);
    const viewContainerRef = this.adHost.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.menuInit(componentRef);
  }

  menuInit(menu: any) {
    menu.instance.isUserAuthentificated = this.isUserAuthentificated;
    menu.instance.user = this.user;
    menu.instance.login.subscribe(() => {
      this.onLogin();
      menu.destroy();
    });
    menu.instance.logout.subscribe(() => this.onLogout());
    menu.instance.closeMenu.subscribe(() => menu.destroy());
  }

  onLogin() {
    this.router.navigate(['login']);
  }

  onLogout() {
    this.auth.logout();
    this.isUserAuthentificated = this.auth.isUserAuthentificated();
  }
}
