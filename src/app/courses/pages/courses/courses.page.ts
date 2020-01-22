import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPageComponent implements OnInit {
  breadcrumbs: {text: string, url: string}[];

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
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
}
