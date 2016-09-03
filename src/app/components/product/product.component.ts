import {Component} from '@angular/core';
import {Product} from '../../models';

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

  onBidding(bidValue: number): void {
    // do something smart with the bid value
  }
}
