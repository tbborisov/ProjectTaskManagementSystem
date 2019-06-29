import { Injectable } from '@angular/core';
import { PROJECTS } from './mock-projects';
import { Project } from './project';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetProjectsService {

  constructor(private http: HttpClient) { }
  
  createProject(project: Project){
    return this.http.post(`TaskProg/resources/projectResources/createProject`, project);
  }

  getProjects(){
    return this.http.get<Project[]>(`TaskProg/resources/projectResources/getProjectList`);
  }

  getUserProjects(username: string){
    return this.http.get<Project[]>(`TaskProg/resources/projectResources/getUserProjectList/${username}`);
  }

  editProject(project: Project, prevProjectKey: string){
    return this.http.post(`TaskProg/resources/projectResources/editProject/${prevProjectKey}`, project);
  }

  deleteProject(projectKey: string){
    return this.http.get(`TaskProg/resources/projectResources/deleteProject/${projectKey}`)
  }

  assignUsersToProject(projectKey : string, username: string){
    return this.http.get(`TaskProg/resources/projectResources/assignUsersToProject/${projectKey}/${username}`);
  }
}
