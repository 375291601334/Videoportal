import { AuthService } from './auth.service';
import { User, IUser } from '../../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  const user: IUser = new User('1', 'Anastasiya', 'Hushcha');

  beforeEach(() => {
    service = new AuthService();
    service.user = user;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save user info in localStorage once login', () => {
    expect(service.login()).toEqual(user);
  });
});
