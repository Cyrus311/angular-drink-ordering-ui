import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, OrderSummaryComponent],
  template: `
    <div class="p-6 flex flex-col gap-4">
      <h2 class="text-2xl">Basket</h2>
      @if (cartService.cart().length > 0) {
        @for (item of cartService.cart(); track item.id) {
        <app-cart-item [item]="item"/>
      }
      } @else {
        <p>No item in the basket!</p>
      }
      
      <app-order-summary />
    </div>
  `,
  styles: ``
})
export class CartComponent {

  cartService = inject(CartService);

}
