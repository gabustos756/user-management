import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', () => {
    const mockUsers = {
      data: [
        {
          id: 1,
          email: 'test@test.com',
          first_name: 'John',
          last_name: 'Doe',
          avatar: 'avatar.jpg'
        }
      ]
    };

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers.data);
    });

    const req = httpMock.expectOne('https://reqres.in/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should update user', () => {
    const mockUser: User = {
      id: 1,
      email: 'test@test.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'avatar.jpg',
      address: {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA',
        postalCode: '02108',
        country: 'United States'
      }
    };

    service.updateUser(mockUser).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`https://reqres.in/api/users/${mockUser.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockUser);
  });
});