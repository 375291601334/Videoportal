import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
})
export class DateInputComponent implements OnChanges {
  @Input() dateFormGroup: FormGroup;
  @Input() prefilledValue: string;

  constructor() {}

  ngOnChanges() {
    this.dateFormGroup.patchValue({
      value: this.prefilledValue,
    });
  }
}
