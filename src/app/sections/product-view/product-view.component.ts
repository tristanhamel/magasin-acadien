import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import './product-view.scss';

@Component({
  selector: 'product-view',
  template: require('./product-view.html')
})

export class ProductView {
  product_id: string;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => { this.product_id = params['product_id']; }); // tslint:disable-line:no-string-literal

    // TODO: bind to products service to grab the product with id product_id
  }
}
