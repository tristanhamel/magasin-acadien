import {Component} from '@angular/core';
import {Product} from '../../models';
import {TimeCounter} from '../time-counter/time-counter.component';
import {Bidder} from '../bidder/bidder.component';

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
   ],
  directives: [
    TimeCounter,
    Bidder
  ]
})

export class ProductComponent {
  data: Product;
  extended: boolean;

  constructor() {

    console.log(this.data);
  }


  onBidding(bidValue: number): void {
    // do something smart with the bid value
  }
}
