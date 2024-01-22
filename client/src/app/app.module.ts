import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { CuisineInputComponent } from './cuisine-input/cuisine-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import the TitleCasePipe
import { TitleCasePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsListComponent,
    RestaurantFormComponent,
    AddRestaurantComponent,
    EditRestaurantComponent,
    CuisineInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule
  ],
  providers: [TitleCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
