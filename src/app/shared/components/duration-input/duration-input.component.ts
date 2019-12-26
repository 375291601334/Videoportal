import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
})
export class DurationInputComponent implements OnChanges {
  @Input() durationFormGroup: FormGroup;
  @Input() prefilledValue: number;

  constructor() {}

  ngOnChanges() {
    this.durationFormGroup.patchValue({
      value: this.prefilledValue,
    });
  }
}
