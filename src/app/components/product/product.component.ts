import {Component} from '@angular/core';

import {BidsService} from '../../services/bids.service';
import {Bid, Product} from '../../models';

import './product.scss';

@Component({
  host: {
    class: 'product-component'
  },
  selector: 'product',
  template: require('./product.html'),
  inputs: [
    'product:init',
    'extended'
  ]
})

export class ProductComponent {
  product: Product;
  extended: boolean;

  constructor(private bidsService: BidsService) {}

  bidding(bid: Bid): void {
    // This is the way to make a deep clone in js
    const updated = JSON.parse(JSON.stringify(this.product));
    updated.bids.push(bid);
    updated.currentPrice = (Math.round((bid.value + updated.currentPrice) * 100)) / 100;

    this.bidsService.make(updated).then(
      (response: any) => {console.log(response);}
    );
  }
}
