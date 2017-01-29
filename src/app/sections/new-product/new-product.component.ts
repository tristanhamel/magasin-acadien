import { Component } from '@angular/core';
import {Product} from '../../models';

import './new-product.scss';

@Component ({
  selector: 'new-product',
  template: require('./new-product.html')
})

export class NewProduct {
  model: Product = new Product;

  constructor() {}

  onSubmit() {}

  reset() {
   this.model = new Product;
  }
}
