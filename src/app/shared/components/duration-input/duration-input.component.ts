import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationInputComponent {
  @Input() duration: Number;

  constructor() {}
}
