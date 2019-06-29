import { TestBed } from '@angular/core/testing';

import { GetMeetingsService } from './get-meetings.service';

describe('GetMeetingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetMeetingsService = TestBed.get(GetMeetingsService);
    expect(service).toBeTruthy();
  });
});
