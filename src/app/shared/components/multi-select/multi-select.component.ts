import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
})
export class MultiSelectComponent implements OnInit {
  @Input() options: { id: string, name: string }[];

  selectedOptions: { id: string, name: string }[];

  constructor() {}

  ngOnInit() {
    this.selectedOptions = this.options;
  }
}
