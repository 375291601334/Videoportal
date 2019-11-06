import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  public transform(items: any[], prop: string, isDesc: boolean): any {
    const direction: number = isDesc ? 1 : -1;

    return [...items].sort((first, second) => {
      if (first[prop] > second[prop]) {
        return -1 * direction;
      } else if (first[prop] < second[prop]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
}
