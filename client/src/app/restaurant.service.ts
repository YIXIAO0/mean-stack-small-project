import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Restaurant } from './restaurant';
import { CuisineType } from './cuisine-type';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private url = 'http://localhost:5200';
  private restaurants$: Subject<Restaurant[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshRestaurants() {
    this.httpClient.get<Restaurant[]>(`${this.url}/restaurants`)
      .subscribe(restaurants => {
        this.restaurants$.next(restaurants);
      });
  }

  getRestaurants(): Subject<Restaurant[]> {
    this.refreshRestaurants();
    return this.restaurants$;
  }

  getFilteredRestaurants(name: string = '', minRating: number | null = null, maxRating: number | null = null): Observable<Restaurant[]> {
    let params = new HttpParams();
    if (name) {
        params = params.append('name', name);
    }
    if (minRating !== null) {
        params = params.append('minRating', minRating.toString());
    }
    if (maxRating !== null) {
        params = params.append('maxRating', maxRating.toString());
    }

    return this.httpClient.get<Restaurant[]>(`${this.url}/filteredRestaurants`, { params });
}


  getRestaurant(id: string): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${this.url}/restaurants/${id}`);
  } 

  createRestaurant(restaurant: Restaurant): Observable<string> {
    return this.httpClient.post(`${this.url}/restaurants`, restaurant, { responseType: 'text' });
  }

  updateRestaurant(id: string, restaurant: Restaurant): Observable<string> {
    return this.httpClient.put(`${this.url}/restaurants/${id}`, restaurant, { responseType: 'text' });
  }

  deleteRestaurant(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/restaurants/${id}`, { responseType: 'text' });
  }

  getCuisineTypes(): Observable<CuisineType[]> {
    return this.httpClient.get<CuisineType[]>('http://localhost:5200/cuisineTypes');
  }

}
