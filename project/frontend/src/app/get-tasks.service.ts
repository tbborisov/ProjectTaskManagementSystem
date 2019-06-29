import { Injectable } from '@angular/core';
import { TASKS } from './mock-tasks';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Task } from './task';
import { Meeting } from './meeting';
import { MeetingTask } from './meeting-task';


@Injectable({
  providedIn: 'root'
})
export class GetTasksService {

  constructor(private http: HttpClient) { }
  
  createTask(projectKey: string, meetingtask: MeetingTask){
    return this.http.post(`TaskProg/resources/taskResources/createTask/${projectKey}`, meetingtask);
  }
  
  getTasks(projectKey: string, meetingKey: string){
    return this.http.get<Task[]>(`TaskProg/resources/taskResources/getTaskList/${projectKey}/${meetingKey}`);
  }
  
  editTask(prevProjectKey: string, meetingtask: MeetingTask){
    return this.http.post(`TaskProg/resources/taskResources/editTask/${prevProjectKey}`, meetingtask);
  }

  deleteTask(projectKey: string, meetingtask: MeetingTask){
    return this.http.post(`TaskProg/resources/taskResources/deleteTask/${projectKey}`, meetingtask);
  }
  
}
