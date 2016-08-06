import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Notifications} from '../notifications/notifications.component.ts';

import './header.scss';

@Component({
  selector: 'header',
  template: require('./header.html'),
  directives: [
    ROUTER_DIRECTIVES,
    Notifications
  ]
})

export class Header {
  show = {
    collapsible: false
  };

   toggleMenu() {
    this.show.collapsible = !this.show.collapsible;
  }
}
