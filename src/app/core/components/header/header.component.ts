import { Component, OnInit } from '@angular/core';

import { IUser, User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: IUser;

  constructor() {}

  ngOnInit() {
    this.user = new User('0', 'User', 'Name');
  }

  openMenu() {

  }
}
