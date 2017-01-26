import { Routes, RouterModule } from '@angular/router';

// views
import {Landing} from './app/sections/landing/landing.component';
import {Auctions} from './app/sections/auctions/auctions.component';
import {Legal} from './app/sections/legal/legal.component';
import {ProductView} from './app/sections/product-view/product-view.component';

const routes: Routes = [
  {path: '', component: Landing},
  {path: 'auctions', component: Auctions},
  {path: 'legal', component: Legal},
  {path: 'product/:product_id', component: ProductView}
];

export const appRoutingProviders: any[] = [];

export const routing =  RouterModule.forRoot(routes);
