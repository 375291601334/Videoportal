import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPageComponent {
  constructor(private router: Router) { }

  returnHome() {
    this.router.navigate(['']);
  }
}
