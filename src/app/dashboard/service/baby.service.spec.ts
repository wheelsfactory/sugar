import { TestBed, inject } from '@angular/core/testing';

import { BabyService } from './baby.service';

describe('BabyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BabyService]
    });
  });

  it('should be created', inject([BabyService], (service: BabyService) => {
    expect(service).toBeTruthy();
  }));
});
