// import { TestBed, async } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// import { AuthService } from './auth.service';

// describe('AuthService', () => {
//   let httpTestingController: HttpTestingController;
//   let service: AuthService;

//   beforeEach(async() => {
//     TestBed.configureTestingModule({
//       providers: [AuthService],
//       imports: [HttpClientTestingModule],
//     });

//     httpTestingController = TestBed.get(HttpTestingController);
//     service = TestBed.get(AuthService);
//   });

//   afterEach(async() => {
//     httpTestingController.verify();
//   });

//   it('should send POST request once login', () => {
//     service.login('email', 'password')
//       .subscribe(token => {
//         expect(token).toEqual({ token: 'test token' });
//       });

//     const req = httpTestingController.expectOne('https://videoportal-app.herokuapp.com/auth/login');

//     expect(req.request.method).toEqual('POST');

//     req.flush({ token: 'test token' });
//   });

//   it('should send GET request when get user info', () => {
//     const mockUserInfo = { id: '1', firstName: 'Mock', lastName: 'User' };
//     const token = 'test token';

//     service.getUserInfo('test token')
//       .subscribe(userData => {
//         expect(userData).toEqual({ token, user: mockUserInfo });
//       });

//     const req = httpTestingController.expectOne('https://videoportal-app.herokuapp.com/auth/userinfo');

//     expect(req.request.method).toEqual('POST');

//     req.flush({ token, user: mockUserInfo });
//   });
// });
