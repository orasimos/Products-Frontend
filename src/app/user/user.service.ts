import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User, UserAPIList, UserAPIOne } from 'shared';

import { delay } from 'rxjs';

const USER_API = 'https://codingfactory.ddns.net/api/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<UserAPIList>(`${USER_API}/findall`).pipe(delay(1000));
  }

  insertUser(user: User) {
    return this.http.post<UserAPIList>(`${USER_API}/create`, user);
  }

  searchUser(username: string) {
    return this.http.get<UserAPIOne>(`${USER_API}/findone/${username}`).pipe(delay(1000));
  }

  updateUser(user: User) {
    return this.http.patch<User>(`${USER_API}/update`, user);
  }

  deleteUser(username: string) {
    return this.http.delete<UserAPIList>(`${USER_API}/delete/${username}`);
  }
}
