import { Component, inject, input } from '@angular/core';
import { ButtonComponent } from "../../../components/button/button.component";
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/cartItem.model';

@Component({
  selector: 'app-cart-item',
  imports: [ButtonComponent],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-6 flex gap-4 items-center">
      <img [src]="item().item.image" class="image-contain h-[50px] w-[50px]">
      <div class="flex flex-col">
        <span class="text-md font-bold">{{ item().item.title }}</span>
        <span class="text-sm">{{ '$' + item().item.price }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-md font-bold">Quantity: {{ item().quantity }}</span>
      </div>
      <div class="flex pl-5">
        <span ><app-button label="-" (btnClicked)="cartService.decreaseQuantity(item().itemId)" /></span>
        <span class="pl-5"><app-button label="+" (btnClicked)="cartService.increaseQuantity(item().itemId)" /></span>
        
        
      </div>
      <div class="flex-1"></div>
      <app-button label="Remove" (btnClicked)="cartService.removeFromCart(item().id)" />
    </div>
  `,
  styles: ``
})
export class CartItemComponent {
  cartService = inject(CartService);

  item = input.required<CartItem>();
}
