import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../../../store/reducers/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  isUserAuthentificated: boolean;

  constructor(
    private store: Store<fromAuth.State>,
    private router: Router,
  ) {}

  canActivate(): boolean {
    this.store.pipe(select(fromAuth.isUserAuthentificated)).subscribe(
      isUserAuthentificated => this.isUserAuthentificated = isUserAuthentificated,
    );

    if (!this.isUserAuthentificated) {
      this.router.navigate(['login']);
    }

    return this.isUserAuthentificated;
  }
}
