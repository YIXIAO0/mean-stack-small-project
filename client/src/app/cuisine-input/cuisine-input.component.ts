import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cuisine-input',
  template: `
    <div class="cuisine-input-container">
      <mat-form-field class="example-full-width" appearance="fill">
        <mat-label>Cuisine Types</mat-label>
        <input type="text" matInput [formControl]="cuisineCtrl" [matAutocomplete]="autoComplete">
        <mat-autocomplete #autoComplete="matAutocomplete" (optionSelected)="onOptionSelected($event.option.value)">
          <mat-option *ngFor="let cuisine of filteredCuisines | async" [value]="cuisine">
            {{ cuisine }}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </div>
  `
})
export class CuisineInputComponent implements OnInit {
  cuisineCtrl = new FormControl('');
  filteredCuisines: Observable<string[]> = of([]);
  allCuisineObjects: any[] = [];

  @Output() selectedCuisineType = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.addAllCuisineTypesToServer();
    this.loadAllCuisines();
    this.filteredCuisines = this.cuisineCtrl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filter(value || ''))
    );
  }

  private loadAllCuisines(): void {
    this.http.get<any[]>('http://localhost:5200/cuisineTypes').subscribe({
      next: (cuisines) => {
        this.allCuisineObjects = cuisines;
      },
      error: (error) => console.error('Error loading cuisines:', error)
    });
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return of(this.allCuisineObjects
      .map(cuisine => cuisine.name)
      .filter(cuisineName => cuisineName.toLowerCase().includes(filterValue))
    );
  }

  addCuisineIfNotExist(cuisineName: string): void {
    const normalized = cuisineName.trim().toLowerCase();
    if (normalized && !this.allCuisineObjects.some(cuisine => cuisine.name === normalized)) {
      this.http.post<string>('http://localhost:5200/cuisineTypes', { name: normalized }).subscribe({
        next: (response) => {
          this.allCuisineObjects.push({ name: normalized });
          this.selectedCuisineType.emit(normalized);
          this.cuisineCtrl.setValue('');
        },
        error: (error) => console.error('Error adding cuisine type:', error)
      });
    }
  }

  // Function to add all cuisine types to the server
  addAllCuisineTypesToServer(): void {
    for (const cuisine of this.allCuisineObjects) {
      this.addCuisineIfNotExist(cuisine);
    }
  }

  onOptionSelected(cuisineName: string): void {
    this.selectedCuisineType.emit(cuisineName);
  }
}


