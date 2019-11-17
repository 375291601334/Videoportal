import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPageComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  onLogin() {
    this.auth.login();
    this.router.navigate(['']);
  }
}
