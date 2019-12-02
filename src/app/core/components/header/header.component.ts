import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../../../store/reducers/auth';
import * as AuthActions from '../../../store/actions/auth';

import { MenuComponent } from '../menu/menu.component';
import { MenuDirective } from '../../directives/menu/menu.directive';

import { IUser } from '../../../login/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild(MenuDirective, {static: true}) public adHost: MenuDirective;

  user: IUser;
  userSubscription: Subscription;
  isUserAuthentificatedSubscription: Subscription;
  isUserAuthentificated: boolean;

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private router: Router,
    private store: Store<fromAuth.State>,
  ) {
    this.isUserAuthentificatedSubscription = this.store.pipe(select(fromAuth.isUserAuthentificated)).subscribe(
      isUserAuthentificated => this.isUserAuthentificated = isUserAuthentificated,
    );
    this.userSubscription = this.store.pipe(select(fromAuth.getUserIngo)).subscribe(
      user => this.user = user,
    );
  }

  onLogin() {
    this.router.navigate(['login']);
  }

  onLogout() {
    this.store.dispatch(AuthActions.Logout());
    this.router.navigate(['login']);
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

  openMenu() {
    const componentFactory = this.factoryResolver.resolveComponentFactory(MenuComponent);
    const viewContainerRef = this.adHost.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.menuInit(componentRef);
  }
}
