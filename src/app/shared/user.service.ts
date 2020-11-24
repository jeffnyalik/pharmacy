import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './../Entities/users';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginUrl = 'http://127.0.0.1:8000/api/v1/token/';
  adminUrl = 'http://127.0.0.1:8000/api/v1/user/';

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  // get user value
  public getUserValue(): User{
    return this.userSubject.value;
  }

  login(username, password){
  return this.http.post<User>(`${this.loginUrl}`, {username, password})
   .pipe(map(user => {
      // Keep users logged in between page refresh
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
   }));
  }

  logout(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  // get admin username and email address
  adminUser(){
    return this.http.get<User[]>(`${this.adminUrl}`);
  }
}
