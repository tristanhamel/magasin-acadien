import {Component} from '@angular/core';

import './header.scss';

@Component({
  selector: 'header',
  template: require('./header.html')
})

export class Header {
  show: {
    collapsible: boolean
  };

  constructor() {
    this.show = {
      collapsible : false
    };
  }

  toggleMenu() {
    this.show.collapsible = !this.show.collapsible;
  }
}
