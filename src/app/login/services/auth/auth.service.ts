import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) {}

  login(login: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      'https://videoportal-app.herokuapp.com/auth/login',
      { login, password },
    );
  }

  getUserInfo(token: string): Observable<{ token: string, user: IUser }> {
    return this.http.post<IUser>(
      'https://videoportal-app.herokuapp.com/auth/userinfo',
      { token },
    ).pipe(
      map((user: any) => {
        return {
          token: token,
          user: {
            id: user.id,
            firstName: user.name.first,
            lastName: user.name.last,
          },
        };
      }),
    );
  }
}
