import {Component} from '@angular/core';
import {ProductsComponent} from '../../components/products/products.component';

import './auctions.scss';

@Component({
  host: {
    class: 'auctions-component'
  },
  selector: 'auctions',
  template: require('./auctions.html'),
  directives: [ProductsComponent]
})

export class Auctions {}
