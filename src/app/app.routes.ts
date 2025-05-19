import { Routes } from '@angular/router';
import { DrinksListComponent } from './pages/drinks-list/drinks-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { SuccessComponent } from './pages/cart/success/success.component';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: DrinksListComponent
},
{
    path: 'cart',
    component: CartComponent
},
{
  path: 'success/:type',
  component: SuccessComponent
}
];
