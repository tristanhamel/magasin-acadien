import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import './footer.scss';

@Component({
  selector: 'Footer',
  template: require('./footer.html'),
  directives: [ROUTER_DIRECTIVES]
})
export class Footer {}
