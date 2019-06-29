import { TestBed } from '@angular/core/testing';

import { PickedService } from './picked.service';

describe('PickedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PickedService = TestBed.get(PickedService);
    expect(service).toBeTruthy();
  });
});
