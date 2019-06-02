import { TestBed } from '@angular/core/testing';

import { PublicationListServiceService } from './publication-list-service.service';

describe('PublicationListServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicationListServiceService = TestBed.get(PublicationListServiceService);
    expect(service).toBeTruthy();
  });
});
