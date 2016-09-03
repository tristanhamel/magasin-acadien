import {Component, OnChanges, Output, EventEmitter} from '@angular/core';
import {Product} from '../../models';

import './bidder.scss';

@Component({
  host: {
    class: 'bidder'
  },
  selector: 'bidder',
  template: require('./bidder.html'),
  inputs: ['product']
})

export class Bidder implements OnChanges {
  bidValue: number;
  minBid : number;
  currentPrice: number;
  @Output() onBidding: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes: any) {
    var prod: Product = changes.product.currentValue;
    if (prod) {
      this.defineMinBid(prod.currentPrice);
    }
  }

  decreaseBid(): void {
    if (this.bidValue - this.minBid > this.currentPrice) {
      this.bidValue -= this.minBid;
    }
  }

  defineMinBid(currentPrice: number) {
    this.currentPrice = currentPrice;

    if (currentPrice < 3) {
      this.minBid = 0.1;
      this.bidValue = 0.1;
    } else if (currentPrice < 10) {
      this.minBid = 0.2;
      this.bidValue = 0.2;
    } else if (currentPrice < 20) {
      this.minBid = 0.5;
      this.bidValue = 0.5;
    } else {
      this.minBid = 1;
      this.bidValue = 1;
    }
  }

  increaseBid(): void {
    this.bidValue += this.minBid;
    console.log(this.bidValue);
  }

  onSubmit(value: {bid: number}): void {
    console.log(value);
    this.onBidding.emit({bid: value.bid});
  }
}
