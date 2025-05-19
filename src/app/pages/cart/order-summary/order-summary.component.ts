import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
import { PayType } from '../../../common/enums/payType';

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent],
  template: `
   <div class="bg-slate-100 p-6 border shadow-xl rounded-xl">
    <h2 class="text-2xl">Summary</h2>

    <div class="flex flex-col gap-4">
       <div class="flex gap-4 mt-2 items-center">
        <p>PROMO15</p>
        <app-primary-button label="Apply Discount Code" (btnClicked)="discount.set(15)"/>
      </div>
      <div class="flex gap-4 mt-2">
        <span class="text-lg">Total</span>
        <span class="font-bold">{{ '$' + total().toFixed(2) }}</span>
      </div>
      <div class="flex gap-4 mt-2">
        <app-primary-button label="Pay with Card" (btnClicked)="payButtonHandler(PayType.Card)" [disabled]="total() <= 0"/>
        @if (total() <= 10) {
            <app-primary-button label="Pay with Cash" [disabled]="total() <= 0" (btnClicked)="payButtonHandler(PayType.Cash)"/>
        } @else {
            You can only pay with card after $10 total!
        }
      </div>
    </div>
   </div>
  `,
  styles: ``
})
export class OrderSummaryComponent {
  cartService = inject(CartService);
  PayType = PayType;

  constructor(private router: Router) { }

  discount = signal(0);

  total = computed(() => {
    let total = 0;
    PayType
    let discountValue = 0;
    for (const item of this.cartService.cart()) {
      total += (item.item.price * item.quantity);
    }
    if (this.discount() > 0) {
      discountValue = total * (this.discount() / 100)
      total = total - discountValue;
    }
    return total;
  });

  payButtonHandler(button: PayType) {
    console.log("PAY WITH " + button);
    this.router.navigate(['/success', button]);
  }

}
