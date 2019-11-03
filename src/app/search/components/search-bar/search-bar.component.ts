import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter();

  searchTearm = '';

  constructor() {}

  ngOnInit() {}

  onClick(): void {
    this.search.emit(this.searchTearm);
  }
}
