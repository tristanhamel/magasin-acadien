import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import './product.scss';

@Component({
  selector: 'Product',
  template: require('./product.html')
})

export class Product {
  product_id: Number;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => { this.product_id = params['product_id']; });
  }
}
