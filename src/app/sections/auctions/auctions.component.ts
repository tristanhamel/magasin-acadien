import {Component} from '@angular/core';

import './auctions.scss';

@Component({
  host: {
    class: 'auctions-component'
  },
  selector: 'auctions',
  template: require('./auctions.html')
})

export class Auctions {
  filters: {layout: string} = {layout: 'thumbnail'};
}
