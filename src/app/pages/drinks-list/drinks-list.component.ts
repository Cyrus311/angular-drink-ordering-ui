import { Component, inject, signal } from '@angular/core';
import { Drink } from '../../models/drink.model';
import { DrinkCardComponent } from "./drink-card/drink-card.component";
import { DrinkService } from '../../services/drink.service';

@Component({
  selector: 'app-drinks-list',
  imports: [DrinkCardComponent],
  template: `
    <div class="p-8 grid grid-cols-2 gap-4">
      @for (drink of drinks(); track drink.id) {
        <app-drink-card [drink]="drink" />
      }
    </div>
    @if (errorMessage()) {
       <div class="text-red-600">{{ errorMessage() }}</div>
    }
   
  `,
  styles: ``
})
export class DrinksListComponent {
  drinkService = inject(DrinkService);

  async ngOnInit() {
  try {
    const data = await this.drinkService.getAllDrinks();
    this.drinks.set(data);
  } catch (err) {
    this.errorMessage.set((err as Error).message);
  }
}

  errorMessage = signal('');
  drinks = signal<Drink[]>([]);
}
