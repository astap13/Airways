import { TestBed } from '@angular/core/testing';

import { PassengersServiceService } from './passengers-service.service';

describe('PassengersServiceService', () => {
  let service: PassengersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
