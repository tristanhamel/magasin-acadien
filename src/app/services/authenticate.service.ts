import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

import { Urls } from './urls';
import { User } from '../models';
import { UserService } from './user.service';

@Injectable()

// should be refactored to make a backend request for authentication
export class Authenticate {
  public token: string;
  private currentUser: User;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private userService: UserService) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login (email: string, password: string): Observable<boolean> {
    const body = {
      email: email,
      password: password
    };

    console.log(Urls.AUTH);

    return this.http.post(Urls.AUTH, body)
      .map((response: Response) => {
        const token = response.json().token;

        if (token) {
          this.setUser(token);
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });

  }

  logout() {
    this.token = null;
    this.userService.setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }

  signup(userObject: User) {

    return this.http.post(Urls.USER, userObject)
      .map( (response: Response) => {
        const token = response.json().token;

        if (token) {
          this.setUser(token);
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  changePassword(newPassword: string): Observable<boolean> {
    const id = this.currentUser._id;
    const url: string = `${Urls.USER}/${id}/${newPassword}`;

    return this.http.put(url, {})
      .map( (response: Response) => {
        return response.ok;
    });
  }

  private setUser(token: string): void {
    this.token = token;

    const payload = this.jwtHelper.decodeToken(token);

    this.currentUser = {
      _id: payload._id,
      email: payload.email,
      name: payload.name,
      role: payload.role
    };

    // set user
    this.userService.setCurrentUser(this.currentUser);

    const stored = Object.assign({}, this.currentUser, {token: token});

    // store username and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(stored));
  }
}
