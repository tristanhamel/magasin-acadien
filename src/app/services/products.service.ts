import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Product} from '../models';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ProductsService {
  productsUrl = 'mocks/products.json';

  constructor(private http: Http) {}

  getProducts (): Observable<Product[]> {
    return this.http.get(this.productsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead of doing sth like remote logging
    return Observable.throw(errMsg);
  }
}
