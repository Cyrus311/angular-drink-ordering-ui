import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Drink } from '../models/drink.model';
import { firstValueFrom, catchError, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private readonly apiUrl = 'http://localhost:5035/api/orders';

  constructor(private http: HttpClient) {}

  async getAllDrinks(): Promise<Drink[]> {
    try {
      return await firstValueFrom(
        this.http.get<Drink[]>(this.apiUrl).pipe(
          catchError(err => {
            console.error('getAllDrinks error:', err);
            return throwError(() => new Error('Failed to load drinks.'));
          })
        )
      );
    } catch (error) {
      throw error;
    }
  }

  async getDrinkById(id: number): Promise<Drink> {
    try {
      return await firstValueFrom(
        this.http.get<Drink>(`${this.apiUrl}/${id}`).pipe(
          catchError(err => {
            console.error('getDrinkById error:', err);
            return throwError(() => new Error('Drink not found.'));
          })
        )
      );
    } catch (error) {
      throw error;
    }
  }

  async searchDrinks(query: string): Promise<Drink[]> {
    try {
      return await firstValueFrom(
        this.http.get<Drink[]>(`${this.apiUrl}?search=${query}`).pipe(
          catchError(err => {
            console.error('searchDrinks error:', err);
            return throwError(() => new Error('Search failed.'));
          })
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
