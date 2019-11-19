import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginModule } from '../login/login.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { MenuComponent } from './components/menu/menu.component';

import { NotFoundPageComponent } from './pages/not-found.page';

import { MenuDirective } from './directives/menu.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumbsComponent,
    NotFoundPageComponent,
    MenuComponent,
    MenuDirective,
  ],
  imports: [
    CommonModule,
    LoginModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
  ],
  entryComponents: [
    MenuComponent,
  ],
})
export class CoreModule { }
