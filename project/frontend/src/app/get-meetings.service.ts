import { Injectable } from '@angular/core';
import { MEETINGS } from './mock-meetings';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Meeting } from './meeting';

@Injectable({
  providedIn: 'root'
})
export class GetMeetingsService {
  
  constructor(private http: HttpClient) { }
  
  createMeeting(projectKey: string, meeting: Meeting){
    return this.http.post(`TaskProg/resources/meetingResources/createMeeting/${projectKey}`, meeting);
  }
  
  getMeetings(projectKey: string){
    return this.http.get<Meeting[]>(`TaskProg/resources/meetingResources/getMeetingList/${projectKey}`);
  }

  editMeeting(meeting: Meeting, prevProjectKey: string){
    return this.http.post(`TaskProg/resources/meetingResources/editMeeting/${prevProjectKey}`, meeting);
  }

  deleteMeeting(projectKey: string, meeting: Meeting){
    return this.http.post(`TaskProg/resources/meetingResources/deleteMeeting/${projectKey}`, meeting);
  }
}
