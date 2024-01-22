import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  template: 
    `<form class="restaurant-form" autocomplete="off" [formGroup]="restaurantForm" (ngSubmit)="submitForm()">
      
      <!-- Name Field -->
      <div class="form-floating mb-3">
        <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
        <label for="name">Name</label>
      </div>

      <!-- Validation for Name -->
      <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
        <div *ngIf="name.errors?.['required']">
          Name is required.
        </div>
      </div>

      <!-- Location Field -->
      <div class="form-floating mb-3">
        <input class="form-control" type="text" id="location" formControlName="location" placeholder="Location" required>
        <label for="location">Location</label>
      </div>

      <!-- Validation for Location -->
      <div *ngIf="location.invalid && (location.dirty || location.touched)" class="alert alert-danger">
        <div *ngIf="location.errors?.['required']">
          Location is required.
        </div>
      </div>

      <!-- Rating Field -->
      <div class="form-floating mb-3">
        <input class="form-control" type="number" id="rating" formControlName="rating" placeholder="Rating" min="1" max="5" required>
        <label for="rating">Rating (1-5)</label>
      </div>

      <!-- Price Range Field (Dropdown) -->
      <div class="form-floating mb-3">
        <select class="form-select" id="priceRange" formControlName="priceRange">
          <option value="" disabled>Select Price Range</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
          <option value="$$$$">$$$$</option>
        </select>
        <label for="priceRange">Price Range</label>
      </div>

      <!-- Website URL Field -->
      <div class="form-floating mb-3">
        <input class="form-control" type="url" id="websiteURL" formControlName="websiteURL" placeholder="Website URL">
        <label for="websiteURL">Website URL</label>
      </div>

      <!-- Cuisine Type Field -->
      <div class="form-group">
        <app-cuisine-input (selectedCuisineType)="onCuisineTypeSelect($event)"></app-cuisine-input>
      </div>

      <!-- Submit Button -->
      <button class="btn btn-primary" type="submit" [disabled]="restaurantForm.invalid">
        {{ actionType === 'add' ? 'Add Restaurant' : 'Submit Updates' }}
      </button>
    </form>
    `,
    styles: [
      `.employee-form {
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
      }`
  ]
})

// <!-- Validation for Cuisine Type -->
// <div *ngIf="cuisineType.invalid && (cuisineType.dirty || cuisineType.touched)" class="alert alert-danger">
//   <div *ngIf="cuisineType.errors?.['required']">
//     Cuisine Type is required.
//   </div>
// </div>

export class RestaurantFormComponent implements OnInit {
  @Input() actionType: 'add' | 'edit' = 'add';
  @Input() initialState: BehaviorSubject<Restaurant> = new BehaviorSubject({});
  @Output() formValuesChanged = new EventEmitter<Restaurant>();
  @Output() formSubmitted = new EventEmitter<Restaurant>();

  restaurantForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService) {}

  get name() {return this.restaurantForm.get('name')!;}
  get location() {return this.restaurantForm.get('location')!;}
  get rating() {return this.restaurantForm.get('rating')!;}
  get priceRange() {return this.restaurantForm.get('priceRange')!;}
  get websiteURL() {return this.restaurantForm.get('websiteURL')!;}
  get cuisineType() { return this.restaurantForm.get('cuisineType')!; }

  ngOnInit(): void {
    this.initialState.subscribe(restaurant => {
      this.restaurantForm = this.fb.group({
        name: [restaurant.name, Validators.required],
        location: [restaurant.location, Validators.required],
        cuisineType: [restaurant.cuisineType || ''],
        rating: [restaurant.rating, [Validators.required, Validators.min(0), Validators.max(5)]],
        priceRange: [restaurant.priceRange, Validators.required],
        websiteURL: [restaurant.websiteURL]
      });
    });
    this.restaurantForm.valueChanges.subscribe((val) => {this.formValuesChanged.emit(val); });
  }

  onCuisineTypeSelect(selectedType: string): void {
    console.log(selectedType);
    this.cuisineType.setValue(selectedType);
  }

  submitForm(): void {
    console.log('Submitting form:', this.restaurantForm.value);
    this.formSubmitted.emit(this.restaurantForm.value);
  }

}
