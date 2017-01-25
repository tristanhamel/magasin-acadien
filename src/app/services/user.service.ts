import {Injectable} from '@angular/core';
// import {Http, Response} from '@angular/http';

import {User} from '../models';
import {Subject, BehaviorSubject} from 'rxjs';

@Injectable()
export class UserService {

  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
}

export const userServiceInjectables: Array<any> = [
  UserService
];
