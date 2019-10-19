import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    const minInHour = 60;
    const hours = Math.floor(value / minInHour);
    const min = value % minInHour;
    let result = hours > 0 ? `${hours}h ` : ``;
    result += min > 0 ? `${min} min` : ``;

    return result;
  }
}
