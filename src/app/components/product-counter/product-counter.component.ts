import {Component, EventEmitter} from '@angular/core';
import {Product} from '../../models';

import './product-counter.scss';

@Component({
  host: {
    class: 'product-counter'
  },
  selector: 'product-counter',
  template: require('./product-counter.html'),
  inputs: ['products'],
  outputs: ['moreProducts']
})

export class ProductCounter {
  products: Product[];
  moreProducts: EventEmitter<any>;

  constructor() {
    this.products = [];
    this.moreProducts = new EventEmitter();
  }

  showMore(): void {
    this.moreProducts.emit('showMore');
  }
}
