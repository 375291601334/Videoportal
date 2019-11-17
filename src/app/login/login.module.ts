import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageComponent } from './pages/login/login.page';

@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoginPageComponent,
  ],
})
export class LoginModule { }
