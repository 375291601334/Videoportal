import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

import { NotFoundPageComponent } from './pages/not-found.page';
import { MenuComponent } from './components/menu/menu.component';
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
