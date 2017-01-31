import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import { Urls } from './urls';
import {Product} from '../models';
import { BidsService } from './bids.service';

@Injectable()
export class ProductsService {
  productsUrl: string = 'mocks/products.json';

  // we keep a products store up to date.
  // getProducts observable always returns the store.
  products: Product[] = [];

  constructor(private http: Http,  private authHttp: AuthHttp, private bidsService: BidsService) {}

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
        const ids = this.products.map((obj) => obj._id);
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

  newProduct(newItem: Product): Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('token');
    headers.append('Authorization', `Bearer ${authToken}`);
    const options = new RequestOptions({headers});

    return this.http.post(Urls.PRODUCT, newItem, options );
      // .subscribe( response => response.json().product);
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
