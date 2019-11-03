import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStartDate]',
})
export class StartDateDirective implements OnInit {
  @Input('appStartDate') startDate: Date;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const currentDate = new Date();

    if (this.startDate > currentDate) {
      this.element.nativeElement.style.border = '1px solid blue';
      console.log('blue');
    } else if (this.startDate < currentDate && this.startDate >= this.addDays(currentDate, -14)) {
      this.element.nativeElement.style.border = '1px solid green';
      console.log('green');
    }
  }

  addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);

    return result;
  }
}
