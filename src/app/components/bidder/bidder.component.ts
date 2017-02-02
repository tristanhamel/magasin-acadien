import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Bid, Product, User } from '../../models';
import { Authenticate } from '../../services/authenticate.service';

import './bidder.scss';

@Component({
  host: {
    class: 'bidder'
  },
  selector: 'bidder',
  template: require('./bidder.html')
})

export class Bidder implements OnChanges, OnInit {
  bidValue: number;
  minBid : number;
  user: User;

  @Input() pending: boolean = false;
  @Input() product: Product;
  @Output() onBidding: EventEmitter<any> = new EventEmitter();

  constructor(private userService: Authenticate) {}

  ngOnInit() {
    this.userService.currentUser
      .subscribe( (user: User) => {
        this.user = user;
      });
  }

  ngOnChanges(changes: any) {
    if (changes.product) {
      var prod: Product = changes.product.currentValue;
      if (prod) {
        this.product = prod;
        this.defineMinBid(prod.currentPrice);
      }
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
      user: this.user,
      value: value
    });
    this.onBidding.emit(bid);
  }
}
