import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';

import { AppComponent } from './app.component';

import { AuthEffects } from './store/effects/auth';
import { CoursesEffects } from './store/effects/courses';
import { reducers } from './store/reducers/index';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SweetAlert2Module,
    CoreModule,
    CoursesModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, CoursesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
