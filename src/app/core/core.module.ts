import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { LoginModule } from '../login/login.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { MenuComponent } from './components/menu/menu.component';

import { NotFoundPageComponent } from './pages/not-found/not-found.page';

import { MenuDirective } from './directives/menu/menu.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    NotFoundPageComponent,
    MenuComponent,
    MenuDirective,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    LoginModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  entryComponents: [
    MenuComponent,
  ],
})
export class CoreModule { }
