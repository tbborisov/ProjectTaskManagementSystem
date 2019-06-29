import { TestBed, async } from '@angular/core/testing';

import { GetProjectsService } from './get-projects.service';
import { Project } from './project';
import { HttpErrorResponse } from '../../node_modules/@angular/common/http';
import { of } from '../../node_modules/rxjs';

fdescribe('GetProjectsService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let getProjectsService: GetProjectsService;
 
beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  getProjectsService = new GetProjectsService(<any> httpClientSpy);
});
 
it('should return expected projects (HttpClient called once)', () => {
  const expectedProjects: Project[] =
    [{ projectKey: 'gal', projectTitle: 'galileo' },
     { projectKey: 'HK', projectTitle: 'HdadadKajkdfjaf' },
     { projectKey: 'RTL', projectTitle: 'rlrlg' },
     { projectKey: 'ATP', projectTitle: 'Animation Test Project' },
     { projectKey: 'testAssign', projectTitle: 'ta' }
    ];
 
  httpClientSpy.get.and.returnValue(of(expectedProjects));
 
  getProjectsService.getProjects().subscribe(
    projects => expect(projects).toEqual(expectedProjects, 'expected heroes'),
    fail
  );
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
});
 
/*

it('should return an error when the server returns a 404', () => {
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404, statusText: 'Not Found'
  });
 
  httpClientSpy.get.and.returnValue(of(errorResponse));
 
  getProjectsService.getProjects().subscribe(
    projects => fail('expected an error, not heroes'),
    error  => expect(error.message).toContain('test 404 error')
  );
});
*/
});
