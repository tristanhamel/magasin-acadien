import {Component, EventEmitter} from '@angular/core';
import {Product} from '../../models';

import './bidder.scss';

@Component({
  host: {
    class: 'bidder'
  },
  selector: 'bidder',
  template: require('./bidder.html'),
  inputs: ['product'],
   outputs: ['onBidding']
})

export class Bidder {
  bidValue: number;
  minBid : number;
  product: Product;
  onBidding: EventEmitter<number>;

  constructor() {
    if (this.product.currentPrice < 3) {
      this.minBid = 0.1;
    } else if (this.product.currentPrice < 10) {
      this.minBid = 0.2;
    } else if (this.product.currentPrice < 20) {
      this.minBid = 0.5;
    } else {
      this.minBid = 1;
    }

    this.onBidding = new EventEmitter<number>();
  }

  decreaseBid(): void {
    if (this.bidValue - this.minBid > this.product.currentPrice) {
      this.bidValue -= this.minBid;
    }
  }

  increaseBid(): void {
    this.bidValue += this.minBid;
  }

  onSubmit(value: {bid: number}): void {
    console.log(value);
    this.onBidding.emit(value.bid);
  }
}
