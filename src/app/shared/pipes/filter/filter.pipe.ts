import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], name: string, searchTearm: string): any {
    return searchTearm
      ? items.filter((item) => item[name].toString().toLowerCase().includes(searchTearm.toLowerCase()))
      : items;
  }
}
