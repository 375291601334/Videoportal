import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchTearm: string = '';

  constructor() {}

  ngOnInit() {}

  onClick(text: string): void {
    console.log(text);
  }
}
