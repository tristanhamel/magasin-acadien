import {Component, OnChanges, Output, EventEmitter} from '@angular/core';

import {Bid, Product} from '../../models';
import {UserService} from '../../services/user.service';

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
  product: Product;
  @Output() onBidding: EventEmitter<any> = new EventEmitter();

  constructor(private user: UserService) {}

  ngOnChanges(changes: any) {
    var prod: Product = changes.product.currentValue;
    if (prod) {
      this.product = prod;
      this.defineMinBid(prod.currentPrice);
    }
  }

  defineMinBid(currentPrice: number) {
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

  onSubmit(value: any): void {
    const bid = new Bid({
      user: this.user.getUser(),
      value: value
    });
    console.log(bid);
    this.onBidding.emit(bid);
  }
}
