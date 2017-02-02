import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { JwtHelper } from 'angular2-jwt';

import { Urls } from './urls';
import { User, NewUser } from '../models';

@Injectable()

// should be refactored to make a backend request for authentication
export class Authenticate {
  currentUser: Subject<User> = new BehaviorSubject<User>(null);
  access_token: Subject<string> = new BehaviorSubject<string>(null);

  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) {
    // any time refresh returns, the access_token is updated
    this.refresh().subscribe(
      access_token => this.access_token.next(access_token)
    );
  }

  login (email: string, password: string): Observable<boolean> {
    const body = {
      email: email,
      password: password
    };

    return this.http.post(`${Urls.AUTH}/login`, body)
      .map((response: Response) => {
        const refresh_token = response.json().refresh_token;
        const access_token = response.json().access_token;

        this.setUser(refresh_token);

        this.access_token.next(access_token);
        this.tokenTimeout();

        // return true to indicate successful login
        return true;
      });
  }

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('redresh_token');
    localStorage.removeItem('access_token');
  }

  tokenTimeout() {
    setTimeout(
      () => {
        this.refresh();
      },
      4.5 * 60 * 1000 // 4.5 mins
    );
  }

  // get a new authentication token
  refresh(): Observable<string> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let refresh_token = localStorage.getItem('refresh_token');
    headers.append('Authorization', `Bearer ${refresh_token}`);
    const options = new RequestOptions({headers});

    const url: string = `${Urls.AUTH}/refresh`;

    return this.http.get(url, options)
      .map( (response: Response) => {
        const access_token = response.json().access_token;
        this.tokenTimeout();
        return access_token;
      });
  }

  signup(newUser: NewUser): Observable<boolean> {

    return this.http.post(Urls.USER, newUser)
      .map( (response: Response) => {
        console.log(response);
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

  // changePassword(newPassword: string): Observable<boolean> {
  //   const id = this.currentUser._id;
  //   const url: string = `${Urls.USER}/${id}/${newPassword}`;
  //
  //   return this.http.put(url, {})
  //     .map( (response: Response) => {
  //       return response.ok;
  //   });
  // }

  private setUser(refresh_token: string): void {

    const payload = this.jwtHelper.decodeToken(refresh_token);

    const user = {
      _id: payload._id,
      email: payload.email,
      name: payload.name,
      role: payload.role
    };

    // set user
    this.currentUser.next(user);

    // store username and jwt tokens in local storage to keep user logged between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));

    if (refresh_token) {
      localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
    }
  }
}
