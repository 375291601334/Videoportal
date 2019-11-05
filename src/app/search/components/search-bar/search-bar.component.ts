import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchTearm = '';

  constructor() {}

  ngOnInit() {}

  onClick(): void {
    console.log(this.searchTearm);
  }
}
