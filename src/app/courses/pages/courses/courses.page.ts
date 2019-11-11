import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPageComponent implements OnInit {
  searchTerm: string;

  constructor() { }

  ngOnInit() {}

  onSearch(text: string) {
    this.searchTerm = text;
  }
}
