import { NgModule }      from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

// views
import { Landing } from './app/sections/landing/landing.component';
import { Auctions } from './app/sections/auctions/auctions.component';
import { Signup } from './app/sections/signup/signup.component';
import { Legal } from './app/sections/legal/legal.component';
import { ProductView } from './app/sections/product-view/product-view.component';
import { NewProduct } from './app/sections/new-product/new-product.component';

// global components
import { Header, UserMenu, Login, Footer, Notifications, Bidder, ProductComponent, ProductsComponent, ProductCounter, ProductImage, TimeCounter, Spinner} from './app/components/components';
import { AppComponent }  from './app.component';

import { routing } from './app.routes';

// fonts
import './fonts/fontello-23b9cdcf/css/fontello.css';

// styles
import './app-components.scss';

// global services
import {
  BidsService,
  ProductsService,
  UserService,
  Authenticate
} from './app/services/services';

// custom auth factory to attach token to authenticated requests
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token'))
  }), http, options);
}

@NgModule({
  imports: [                       // module dependencies
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    Ng2CloudinaryModule,
    FileUploadModule
  ],
  declarations: [                  // components and directives
    Landing,
    Auctions,
    Signup,
    Legal,
    ProductView,
    NewProduct,
    Header,
    UserMenu,
    Login,
    Footer,
    Bidder,
    AppComponent,
    Notifications,
    ProductComponent,
    ProductsComponent,
    ProductCounter,
    ProductImage,
    Spinner,
    TimeCounter
   ],
  bootstrap: [ AppComponent ],     // root component
  providers: [                     // services
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    BidsService,
    ProductsService,
    UserService,
    Authenticate,
  ]
})
export class AppModule { }
