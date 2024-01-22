import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  template: `
   <h2 class="text-center m-5">Add a New Restaurant</h2>
   <app-restaurant-form (formSubmitted)="addRestaurant($event)" [actionType]="'add'"></app-restaurant-form>
  `
})
export class AddRestaurantComponent {

  constructor(
    private router: Router,
    private restaurantService: RestaurantService
  ) { }

  addRestaurant(restaurant: Restaurant) {
    this.restaurantService.createRestaurant(restaurant)
      .subscribe({
        next: () => {
          this.router.navigate(['/restaurants']);
        },
        error: (error) => {
          alert("Failed to create restaurant");
          console.error(error);
          console.log("Restaurant data:", restaurant);
        }
      });
  }

}
