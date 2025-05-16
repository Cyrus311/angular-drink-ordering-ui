import { Drink } from "./drink.model";
import { v4 as uuidv4 } from 'uuid';

export interface CartItem {
    id: string;
    itemId: number;
    quantity: number;
    item: Drink;
}

export function createCartItem(itemId: number, quantity: number, item: Drink): CartItem {
  return {
    id: uuidv4(),
    itemId,
    quantity,
    item
  };
}