import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
 
const routes: Routes = [
 { path: '', redirectTo: 'restaurants', pathMatch: 'full' },
 { path: 'restaurants', component: RestaurantsListComponent },
 { path: 'restaurants/new', component: AddRestaurantComponent },
 { path: 'restaurants/edit/:id', component: EditRestaurantComponent }];
 
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }
