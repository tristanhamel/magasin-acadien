import {Component} from '@angular/core';
import {Bid, Product} from '../../models';

import './product.scss';

@Component({
  host: {
    class: 'product-component'
  },
  selector: 'product',
  template: require('./product.html'),
  inputs: [
    'data',
    'extended'
  ]
})

export class ProductComponent {
  data: Product;
  extended: boolean;

  bidding(bid: Bid): void {
    console.log(bid);
  }
}
