import { TestBed } from '@angular/core/testing';

import { IndustryService } from './industry.service';

describe('IndustryService', () => {
  let service: IndustryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndustryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
