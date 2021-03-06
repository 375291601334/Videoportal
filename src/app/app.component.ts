import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeEn from '@angular/common/locales/en';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'courses-listing-app';

  constructor(
    public translate: TranslateService,
  ) {
    const browserLang = translate.getBrowserLang();
    translate.setDefaultLang(browserLang.match(/en|ru/) ? browserLang : 'en');

    registerLocaleData(localeRu);
    registerLocaleData(localeEn);
  }
}
