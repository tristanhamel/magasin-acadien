/// <reference path="../typings/index.d.ts"/>

import {Component} from '@angular/core';

import {ROUTER_DIRECTIVES, RouterConfig} from '@angular/router';

// components
import {Header} from './app/components/header/header.component';
import {Footer} from './app/components/footer/footer.component';

// views
import {Landing} from './app/sections/landing/landing.component';
import {Auctions} from './app/sections/auctions/auctions.component';
import {Login} from './app/sections/login/login.component';
import {Signup} from './app/sections/signup/signup.component';
import {Legal} from './app/sections/legal/legal.component';
import {ProductView} from './app/sections/product-view/product-view.component';

// global services
import {HTTP_PROVIDERS} from '@angular/http';
import {ProductsService} from './app/services/products.service';


@Component({
  selector: 'root',
  template:
`<div class="main-container">
  <header></header>
  <div class="main-content">
    <router-outlet></router-outlet>
  </div>
  <Footer></Footer>
</div>`,
  directives: [
    ROUTER_DIRECTIVES,
    Header,
    Footer
   ],
   providers: [
     ProductsService,
     HTTP_PROVIDERS
   ]
})

export class Root {
}

export const routes: RouterConfig = [
  {path: '', component: Landing},
  {path: 'auctions', component: Auctions},
  {path: 'login', component: Login},
  {path: 'signup', component: Signup},
  {path: 'legal', component: Legal},
  {path: 'product/:product_id', component: ProductView}
];
