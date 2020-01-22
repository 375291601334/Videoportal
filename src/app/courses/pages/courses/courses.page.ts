import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  breadcrumbs: {text: string, url: string}[];
  languageSubscription: Subscription;

  constructor(
    private translate: TranslateService,
  ) {
    this.languageSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.breadcrumbs = [
        { text: this.translate.instant('Courses'), url: '' },
      ];
    });
  }

  ngOnInit() {
    this.breadcrumbs = [
      { text: this.translate.instant('Courses'), url: '' },
    ];
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
