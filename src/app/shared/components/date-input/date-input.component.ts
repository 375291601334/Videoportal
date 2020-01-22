import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IDatePickerDirectiveConfig } from 'ng2-date-picker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
})
export class DateInputComponent implements OnChanges, OnInit, OnDestroy {
  @Input() dateFormGroup: FormGroup;
  @Input() prefilledValue: string;

  config: IDatePickerDirectiveConfig;
  languageSubscription: Subscription;

  constructor(
    private translate: TranslateService,
  ) {
    this.languageSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.config  = {
        format: 'MM-DD-YYYY',
        locale: this.translate.currentLang,
      };
    });
  }

  ngOnInit() {
    this.config  = {
      format: 'MM-DD-YYYY',
      locale: this.translate.currentLang || this.translate.defaultLang,
    };
  }

  ngOnChanges() {
    this.dateFormGroup.patchValue({
      value: this.prefilledValue,
    });
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
