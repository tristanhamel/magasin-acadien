import {Injectable} from '@angular/core';
// import {Http, Response} from '@angular/http';

import {User} from '../models';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/Rx';

@Injectable()
export class UserService {

  userData = {
    _id: '444',
    first_name: 'Robert',
    last_name: 'Le Diable',
    email: null
  };

  getUser (): User {
    return this.userData;
  }

  // eventually, we should have a service fetching user data when needed
  // and updating an internal model then served to the outside.

  // constructor(private http: Http) {}

  // getUser (): Observable<User> {
  //   return this.http.get(this.userData)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  // private extractData(res: Response) {
  //   let body = res.json();
  //   return body.data || { };
  // }

  // private handleError(error: any) {
  //   let errMsg = (error.message) ? error.message :
  //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   console.error(errMsg); // log to console instead of doing sth like remote logging
  //   return Observable.throw(errMsg);
  // }
}
