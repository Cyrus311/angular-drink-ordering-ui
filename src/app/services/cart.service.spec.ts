import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { Drink } from '../models/drink.model';

describe('CartService', () => {
  let service: CartService;

   const mockDrink: Drink = {
    id: 1,
    title: 'Cola',
    price: 2.5,
    stock: 10,
    image: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new item to the cart', () => {
    service.addToCart(mockDrink);
    const items = service.getItems();
    expect(items.length).toBe(1);
    expect(items[0].itemId).toBe(mockDrink.id);
    expect(items[0].quantity).toBe(1);
  });

  it('should increase quantity if item already exists', () => {
    service.addToCart(mockDrink);
    service.addToCart(mockDrink);
    const items = service.getItems();
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
  });

  it('should increase quantity using increaseQuantity()', () => {
    service.addToCart(mockDrink);
    service.increaseQuantity(mockDrink.id);
    const items = service.getItems();
    expect(items[0].quantity).toBe(2);
  });

  it('should decrease quantity using decreaseQuantity()', () => {
    service.addToCart(mockDrink);
    service.increaseQuantity(mockDrink.id); // quantity = 2
    service.decreaseQuantity(mockDrink.id); // back to 1
    const items = service.getItems();
    expect(items[0].quantity).toBe(1);
  });

  it('should remove item if quantity is decreased to 0', () => {
    service.addToCart(mockDrink); // quantity = 1
    service.decreaseQuantity(mockDrink.id); // should remove
    const items = service.getItems();
    expect(items.length).toBe(0);
  });

  it('should remove item from cart using removeFromCart()', () => {
    service.addToCart(mockDrink);
    const itemId = service.getItems()[0].id;
    service.removeFromCart(itemId);
    const items = service.getItems();
    expect(items.length).toBe(0);
  });

  it('should clear all items from cart', () => {
    service.addToCart(mockDrink);
    service.clear();
    expect(service.getItems().length).toBe(0);
  });
});
