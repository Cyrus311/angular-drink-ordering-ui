import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PayType } from '../../../common/enums/payType';

@Component({
  selector: 'app-success',
  imports: [],
  template: `
    <div class="flex flex-col items-center justify-center h-screen bg-green-50 text-green-800 p-4">
      <div class="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 class="text-2xl font-bold mb-4">Success!</h1>
        <p class="text-lg">You paid with <span class="font-semibold">{{ selectedPayType }}</span>.</p>
      </div>
    </div>
  `,
  styles: ``
})
export class SuccessComponent {
  selectedPayType!: PayType;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.selectedPayType = this.route.snapshot.paramMap.get('type') as PayType;
    console.log('Payment Type:', this.selectedPayType);
  }

}
