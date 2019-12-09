import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../../store/reducers/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  userToken: string;

  constructor(private store: Store<fromAuth.State>) {
    this.store.pipe(select(fromAuth.getUserToken)).subscribe(
      token => this.userToken = token,
    );
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/auth/login')) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: this.userToken,
      },
    });

    return next.handle(request);
  }
}
