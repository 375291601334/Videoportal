import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  constructor(
    private translate: TranslateService,
  ) {}

  transform(value: number): string {
    const minInHour = 60;
    const hours = Math.floor(value / minInHour);
    const min = value % minInHour;
    let result = hours > 0 ? `${hours}${this.translate.instant('h')} ` : ``;
    result += min > 0 ? `${min}${this.translate.instant('min')}` : ``;

    return result.trim();
  }
}
