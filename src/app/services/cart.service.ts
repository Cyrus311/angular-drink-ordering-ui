import { Injectable, signal } from '@angular/core';
import { Drink } from '../models/drink.model';
import { Cart } from '../models/cart.model';
import { CartItem, createCartItem } from '../models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _cart = signal<CartItem[]>([]);

  // Expose the signal for external read-only use
  readonly cart = this._cart.asReadonly();

  constructor() { }

  addToCart(drink: Drink) {
    const current = this._cart();
    const existing = current.find(item => item.itemId === drink.id);

    if (existing) {
      this._cart.set(
        current.map(item =>
          item.itemId === drink.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem = createCartItem(drink.id, 1, drink);
      this._cart.set([...current, newItem]);
    }
  }

  removeFromCart(id: string) {
    this._cart.set(this.cart().filter((p) => p.id !== id))
  }

  increaseQuantity(itemId: number): void {
    this._cart.set(
      this.cart().map(item =>
        item.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  decreaseQuantity(itemId: number): void {
    this._cart.set(
      this.cart().flatMap(item => {
        if (item.itemId === itemId) {
          const newQty = item.quantity - 1;
          return newQty > 0 ? [{ ...item, quantity: newQty }] : [];
        }
        return [item];
      })
    );
  }

  getItems(): CartItem[] {
    return [...this.cart()]; // shallow copy
  }

  applyDiscount(): CartItem[] {
    return [...this.cart()]; // shallow copy
  }

  clear(): void {
    this._cart.set([]);
  }
}
