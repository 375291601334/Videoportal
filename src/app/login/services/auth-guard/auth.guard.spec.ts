import { TestBed, inject } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';

class MockRouter {
  navigate() {}
}

describe('AuthGuard:', () => {
  describe('user is authentificated', () => {
    const initialState = {
      auth: {
        isUserAuthentificated: true,
        user: {
          id: '0',
          firstName: 'User',
          lastName: 'Name',
        },
      },
    };
    let service: AuthGuard;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthGuard,
          provideMockStore({ initialState }),
          { provide: Router, useClass: MockRouter },
        ],
      });

      service = TestBed.get(AuthGuard);
    });

    it('should return TRUE', () => {
      expect(service.canActivate()).toBeTruthy();
    });
  });

  describe('user is not authentificated', () => {
    const initialState = {
      auth: {
        isUserAuthentificated: false,
        user: {
          id: '',
          firstName: '',
          lastName: '',
        },
      },
    };
    let service: AuthGuard;
    let router: Router;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthGuard,
          provideMockStore({ initialState }),
          { provide: Router, useClass: MockRouter },
        ],
      });

      service = TestBed.get(AuthGuard);
      router = TestBed.get(Router);
    });

    it('should redirect to login page', () => {
      spyOn(router, 'navigate');

      service.canActivate();
      expect(router.navigate).toHaveBeenCalledWith(['login']);
    });
  });
});
