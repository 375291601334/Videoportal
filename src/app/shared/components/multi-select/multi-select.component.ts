import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
})
export class MultiSelectComponent implements OnChanges {
  @Input() multiselectFormGroup: FormGroup;
  @Input() options: { id: string, name: string }[];
  @Input() prefilledValue: { id: string, name: string }[];

  constructor() {}

  ngOnChanges() {
    this.multiselectFormGroup.patchValue({
      value: this.prefilledValue,
    });
  }
}
