import {Component, OnInit} from '@angular/core';
import 'rxjs/Rx';

import {Product} from '../../models';
import {ProductsService} from '../../services/products.service';

import './products.scss';

@Component({
  host: {
    class: 'products-component'
  },
  selector: 'products',
  template: require('./products.html'),
  inputs: [
    'showMore']
})

export class ProductsComponent implements OnInit {

  public products: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit() { this.getProducts(); }

  getProducts() {
    this.productsService.getProducts()
      .subscribe(
        result => this.products = result,
        error => console.log(error)
      );
  }

  getMoreProducts(e: any) {
    console.log(e);
  }
}
