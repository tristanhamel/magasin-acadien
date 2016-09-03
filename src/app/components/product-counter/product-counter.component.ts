import {Component, Output, OnChanges, EventEmitter} from '@angular/core';
import {Product} from '../../models';

import './product-counter.scss';

@Component({
  host: {
    class: 'product-counter'
  },
  selector: 'product-counter',
  template: require('./product-counter.html'),
  inputs: ['products']
})

export class ProductCounter implements OnChanges {
  @Output() moreProducts: EventEmitter<any> = new EventEmitter();
  productsCount: Number = 0;

  ngOnChanges(changes: any): void {
     var productsChange: Product[] = changes.products.currentValue;
      if (productsChange) {
        this.productsCount = productsChange.length;
      }
  }

  showMore(): void {
    this.moreProducts.emit({currentCount: this.productsCount});
  }
}
