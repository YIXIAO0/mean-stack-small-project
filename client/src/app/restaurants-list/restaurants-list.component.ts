import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../restaurant'
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})

export class RestaurantsListComponent implements OnInit{
  restaurants$: Observable<Restaurant[]> = new Observable();
  searchName: string = '';
  minRating: number | null = null;
  maxRating: number | null = null;

  constructor(private restaurantsService: RestaurantService) {}

  ngOnInit(): void {
      this.fetchRestaurants();
  }

  deleteRestaurant(id: string): void {
    this.restaurantsService.deleteRestaurant(id).subscribe({
      next: () => this.fetchRestaurants()
    });
  }

  private fetchRestaurants(): void {
    this.restaurants$ = this.restaurantsService.getFilteredRestaurants(this.searchName, this.minRating, this.maxRating);
  }

  onSearchChange(): void {
    this.fetchRestaurants();
  }
}