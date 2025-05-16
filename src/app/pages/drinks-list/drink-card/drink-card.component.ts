import { Component, inject, input } from '@angular/core';
import { Drink } from '../../../models/drink.model';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-drink-card',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-6 flex flex-col relative">
      <div class="mx-auto">
        <img class="w-[200px] h-[100px] object-contain" [src]="drink().image" [alt]="drink().title">
        <div class="flex flex-col mt-2">
          <span class="text-md font.bold">{{drink().title}}</span>
          <span class="text-sm">{{ '$' + drink().price}}</span>
          <app-primary-button label="Add to Cart" class="mt-3" [disabled]="drink().stock === 0" 
                              (btnClicked)="cartService.addToCart(drink())"
                               />
        </div>

        <span class="absolute top-2 right-3 text-sm font-bold" [class]="drink().stock ? 'text-green-500' : 'text-red-500'">
          @if (drink().stock) {
            {{drink().stock}} left
          } @else {
            Out of stock
          }
        </span>
      </div>
    </div>
  `,
  styles: ``
})
export class DrinkCardComponent {
  cartService = inject(CartService);

  drink = input.required<Drink>();
}
