import {Component} from '@angular/core';
import {Product} from '../../models';

import './products-view.scss';

@Component({
   host: {
    class: 'products-view'
  },
  selector: 'products-view',
  template: require('./products-view.html')
})

export class ProductsComponent {
  products: Product[];

  constructor() {

    // TODO: retrieve an array of products from a service
    this.products = [];

  }
}
