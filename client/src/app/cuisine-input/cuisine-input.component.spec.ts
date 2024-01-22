import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineInputComponent } from './cuisine-input.component';

describe('CuisineInputComponent', () => {
  let component: CuisineInputComponent;
  let fixture: ComponentFixture<CuisineInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuisineInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
