import { TestBed, inject } from '@angular/core/testing';

import { GetUsersService } from './get-users.service';
import { HttpClient } from '../../node_modules/@angular/common/http';

describe('GetUsersService', () => {
  let service 
  let http: HttpClient

  //beforeEach(() => {service = new GetUsersService(http)});

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [GetUsersService] });
  });

  beforeEach(inject([GetUsersService], s => {
    service = s;
  }));

  it('should return available users', () => {
    expect(service.get()).toHaveBeenCalledTimes(1);
  });

  /*it('should use GetUserService', () => {
    service = TestBed.get(GetUsersService);
    expect(service.getUsers()).toBe('array');
  });

  it('should be created', () => {
    //const service: GetUsersService = TestBed.get(GetUsersService);
    expect(service).toBeTruthy();
  });
  */
});
