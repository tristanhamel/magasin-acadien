import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// views
import {Landing} from './app/sections/landing/landing.component';
import {Auctions} from './app/sections/auctions/auctions.component';
import {Login} from './app/sections/login/login.component';
import {Signup} from './app/sections/signup/signup.component';
import {Legal} from './app/sections/legal/legal.component';
import {ProductView} from './app/sections/product-view/product-view.component';

// global components
import { Header } from './app/components/header/header.component';
import { Footer } from './app/components/footer/footer.component';
import { AppComponent }  from './app.component';
import { Notifications } from './app/components/notifications/notifications.component.ts';
import { Bidder } from './app/components/bidder/bidder.component';
import { ProductComponent } from './app/components/product/product.component';
import { ProductsComponent } from './app/components/products/products.component';
import { ProductCounter } from './app/components/product-counter/product-counter.component';
import { TimeCounter } from './app/components/time-counter/time-counter.component';

import { routing } from './app.routes';

// global services
import { BidsService } from './app/services/bids.service';
import { ProductsService } from './app/services/products.service';
import { UserService } from './app/services/user.service';

@NgModule({
  imports: [                       // module dependencies
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  declarations: [                  // components and directives
    Landing,
    Auctions,
    Login,
    Signup,
    Legal,
    ProductView,
    Header,
    Footer,
    Bidder,
    AppComponent,
    Notifications,
    ProductComponent,
    ProductsComponent,
    ProductCounter,
    TimeCounter
   ],
  bootstrap: [ AppComponent ],     // root component
  providers: [                     // services
    BidsService,
    ProductsService,
    UserService
  ]
})
export class AppModule { }
