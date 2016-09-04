import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Product} from '../models';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ProductsService {
  productsUrl = 'mocks/products.json';

  constructor(private http: Http) {}

  // The http call should eventually be moved to its own service.
  // This service should only concern itself with aggregating streams

  // TODO: also subscribe with the stream from bids service to keep things
  // up to date when a single product has been updated
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
