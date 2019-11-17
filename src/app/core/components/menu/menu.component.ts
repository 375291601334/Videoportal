import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() isUserAuthentificated: boolean;
  @Input() user: IUser;

  @Output() closeMenu = new EventEmitter();
  @Output() login = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onCloseMenu() {
    this.closeMenu.emit(null);
  }

  onLogin() {
    this.login.emit(null);
  }

  onLogout() {
    this.logout.emit(null);
    this.isUserAuthentificated = false;
  }
}
