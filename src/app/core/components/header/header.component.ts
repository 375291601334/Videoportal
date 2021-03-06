import { Component, ComponentFactoryResolver, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import * as fromAuth from '../../../store/reducers/auth';
import * as AuthActions from '../../../store/actions/auth';
import * as fromUser from '../../../store/reducers/user';

import { MenuComponent } from '../menu/menu.component';
import { MenuDirective } from '../../directives/menu/menu.directive';

import { IUser } from '../../../login/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(MenuDirective, {static: true}) public adHost: MenuDirective;

  user: IUser;
  userSubscription: Subscription;
  isUserAuthentificatedSubscription: Subscription;
  isUserAuthentificated: boolean;
  isUserInfoLoading: boolean;
  currentLang: string;

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private router: Router,
    private store: Store<fromAuth.State | fromUser.State>,
    private translate: TranslateService,
  ) {
    this.isUserAuthentificatedSubscription = this.store.pipe(select(fromAuth.isUserAuthentificated)).subscribe(
      isUserAuthentificated => this.isUserAuthentificated = isUserAuthentificated,
    );
    this.userSubscription = combineLatest([
      this.store.pipe(select(fromUser.isUserInfoLoading)),
      this.store.pipe(select(fromUser.getUserInfo)),
    ]).subscribe(([isUserInfoLoading, user]) => {
      this.user = user;
      this.isUserInfoLoading = isUserInfoLoading;
    });
  }

  ngOnInit() {
    this.currentLang = this.translate.defaultLang;
  }

  ngOnDestroy() {
    this.isUserAuthentificatedSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  onLogin() {
    this.router.navigate(['login']);
  }

  onLogout() {
    this.store.dispatch(AuthActions.Logout());
    this.router.navigate(['login']);
  }

  menuInit(menu: any) {
    menu.instance.isUserAuthentificated = this.isUserAuthentificated && !this.isUserInfoLoading;
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

  onLanguageSelect(language: string) {
    this.translate.use(language);
  }
}
