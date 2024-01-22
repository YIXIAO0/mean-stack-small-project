import { TestBed } from '@angular/core/testing';

import { CuisineTypeService } from './cuisine-type.service';

describe('CuisineTypeService', () => {
  let service: CuisineTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuisineTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
