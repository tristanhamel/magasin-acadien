import { Routes, RouterModule } from '@angular/router';

// views
import { Landing } from './app/sections/landing/landing.component';
import { Auctions } from './app/sections/auctions/auctions.component';
import { Legal } from './app/sections/legal/legal.component';
import { ProductView } from './app/sections/product-view/product-view.component';
import { Signup } from './app/sections/signup/signup.component';
import { NewProduct } from './app/sections/new-product/new-product.component';

const routes: Routes = [
  { path: '', component: Landing },
  { path: 'auctions', component: Auctions },
  { path: 'legal', component: Legal },
  { path: 'product/:product_id', component: ProductView },
  { path: 'signup', component: Signup },
  { path: 'new-product', component: NewProduct }
];

export const appRoutingProviders: any[] = [];

// TODO: remove hash strategy and update server to server index html for any sub section of the site
export const routing =  RouterModule.forRoot(routes, { useHash: true });
