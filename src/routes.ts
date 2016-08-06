/// <reference path="../typings/index.d.ts"/>

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouterConfig} from '@angular/router';
import {Header} from './app/header/header.component';
import {Footer} from './app/footer/footer.component';
import {Landing} from './app/landing/landing.component';
import {Auctions} from './app/auctions/auctions.component';
import {Login} from './app/login/login.component';
import {Signup} from './app/signup/signup.component';
import {Legal} from './app/legal/legal.component';

@Component({
  selector: 'root',
  template:
`<div class="main-container">
  <header></header>
  <router-outlet></router-outlet>
  <Footer></Footer>
</div>`,
  directives: [
    ROUTER_DIRECTIVES,
    Header,
    Footer
   ]
})

export class Root {
}

export const routes: RouterConfig = [
  {path: '', component: Landing},
  {path: 'auctions', component: Auctions},
  {path: 'login', component: Login},
  {path: 'signup', component: Signup},
  {path: 'legal', component: Legal}
];
