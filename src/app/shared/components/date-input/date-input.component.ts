import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputComponent {
  @Input() date: Date;

  constructor() { }
}
