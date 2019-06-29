import { TestBed } from '@angular/core/testing';

import { GetTasksService } from './get-tasks.service';

describe('GetTasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetTasksService = TestBed.get(GetTasksService);
    expect(service).toBeTruthy();
  });
});
