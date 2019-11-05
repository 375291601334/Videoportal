import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() user: IUser;

  @Output() closeMenu = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onCloseMenu() {
    this.closeMenu.emit(null);
  }

  onLogOff() {
    console.log('logging off');
  }
}
