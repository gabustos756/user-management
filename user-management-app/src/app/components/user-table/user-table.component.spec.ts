import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserTableComponent } from './user-table.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: Router;

  const mockUsers = [
    {
      id: 1,
      email: 'test@test.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'avatar.jpg'
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers']);
    spy.getUsers.and.returnValue(of(mockUsers));

    await TestBed.configureTestingModule({
      imports: [UserTableComponent, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should navigate to user details when row is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onRowClick(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/user', 1]);
  });
});