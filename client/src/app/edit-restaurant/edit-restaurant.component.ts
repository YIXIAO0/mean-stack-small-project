import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-edit-restaurant',
  template: `
  <h2 class="text-center m-5">Edit an Restaurant</h2>
  <app-restaurant-form [initialState]="restaurant" [actionType]="'edit'" (formSubmitted)="editRestaurant($event)"></app-restaurant-form>
`
})
export class EditRestaurantComponent implements OnInit {
  restaurant: BehaviorSubject<Restaurant> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided!');
    }

    this.restaurantService.getRestaurant(id !).subscribe((restaurant) => {
      this.restaurant.next(restaurant);
    });
  }

  editRestaurant(restaurant: Restaurant){
    this.restaurantService.updateRestaurant(this.restaurant.value._id || '', restaurant)
      .subscribe({
        next: () => {
          this.router.navigate(['/restaurants']);
        },
        error: (error) => {
          alert('Failed to update employee');
        }
      })
  }
}
