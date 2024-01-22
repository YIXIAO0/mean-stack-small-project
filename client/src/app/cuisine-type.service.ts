import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { CuisineType } from './cuisine-type';

@Injectable({
  providedIn: 'root'
})
export class CuisineTypeService {
  private apiUrl = 'http://localhost:5200/cuisineTypes'; 

  constructor(private http: HttpClient) { }

  createCuisineType(cuisineType: CuisineType) {
    return this.http.post<CuisineType>(this.apiUrl, cuisineType);
  }

  getCuisineTypeByName(name: string): Observable<CuisineType> {
    const url = `http://localhost:5200/cuisineTypes/name/${name}`;
    return this.http.get<CuisineType>(url);
  }
}
