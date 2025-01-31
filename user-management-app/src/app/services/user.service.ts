import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user.model';

interface UserResponse {
  data: User[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private users = new BehaviorSubject<User[]>([]);
  users$ = this.users.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<UserResponse>(this.apiUrl).pipe(
      map((response: UserResponse) => {
        const users = response.data;
        this.users.next(users);
        return users;
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      map((updatedUser) => {
        const currentUsers = this.users.value;
        const index = currentUsers.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          currentUsers[index] = updatedUser;
          this.users.next([...currentUsers]);
        }
        return updatedUser;
      })
    );
  }
}
