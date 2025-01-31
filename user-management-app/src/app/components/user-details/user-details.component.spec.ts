import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  const mockUser = {
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

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['updateUser']);
    userServiceSpy.users$ = of([mockUser]);
    userServiceSpy.updateUser.and.returnValue(of(mockUser));

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent, FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user on init', () => {
    expect(component.user).toEqual(mockUser);
  });

  it('should save user and navigate back', () => {
    component.user = mockUser;
    component.onSave();
    expect(userService.updateUser).toHaveBeenCalledWith(mockUser);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate back on cancel', () => {
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});