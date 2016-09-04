import {Injectable, EventEmitter} from '@angular/core';
// import {Http, Response} from '@angular/http';

import {Product} from '../models';
// import {Observable} from 'rxjs/Observable';
 import 'rxjs/Rx';

@Injectable()
export class BidsService {

  updated: EventEmitter<any> = new EventEmitter();

  // constructor(private http: Http) {}

  make (product: Product): any {
    // return this.http.post(this.productsUrl)
    //   .map(this.extractData)
    //   .catch(this.handleError);

    // This is a mocked response
    const response = JSON.parse(JSON.stringify(product));
    response.updated = new Date();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.updated.emit([response]);
        resolve('success');
      }, 2000);
    });
  }

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
