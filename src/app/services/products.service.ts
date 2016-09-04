import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {Product} from '../models';
import { BidsService } from './bids.service';


@Injectable()
export class ProductsService {
  productsUrl = 'mocks/products.json';

  // we keep a products store up to date.
  // getProducts observable always returns the store.
  products: Product[] = [];

  constructor(private http: Http, private bidsService: BidsService) {}

  // The http call should eventually be moved to its own service.
  // This service should only concern itself with aggregating streams

  getProducts (): Observable<Product[]> {
    let main = this.http.get(this.productsUrl)
      .map(this.extractData)
      .catch(this.handleError);

    let update = this.bidsService.updated;

    return main
      .merge(update)                        // bring in updates from bid service
      .map((prods) => {                     // remove duplicates
        if (this.products.length === 0) {
          this.products = prods;            // init store
          return prods;
        }
        const ids = this.products.map((obj) => obj._id)
        prods.map((prod: any) => {
          if (ids.indexOf(prod._id) < 0) {
            this.products.push(prod);
          } else  {
            this.products[ids.indexOf(prod._id)] = prod;
          }
        });
        return this.products;
      });
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
