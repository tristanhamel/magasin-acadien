import {Component} from '@angular/core';
import {Product} from '../../models';
import {ProductComponent} from '../../components/product/product.component';
import {ProductCounter} from '../../components/product-counter/product-counter.component';

import './products-view.scss';

@Component({
   host: {
    class: 'products-view'
  },
  selector: 'products-view',
  template: require('./products-view.html'),
  directives: [
    ProductComponent,
    ProductCounter
  ]
})

export class ProductsComponent {
  products: Product[];

  constructor() {

    // TODO: retrieve an array of products from a service
    this.products = [];

  }
}
