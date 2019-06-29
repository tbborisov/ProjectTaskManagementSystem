import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickedService {

  private userSource = new BehaviorSubject('default message');
  pickeduser = this.userSource.asObservable();

  private projectSource = new BehaviorSubject('default message');
  pickedproject = this.projectSource.asObservable();

  private meetingSource = new BehaviorSubject('default message');
  pickedmeeting = this.meetingSource.asObservable();

  private taskSource = new BehaviorSubject('default message');
  pickedtask = this.taskSource.asObservable();

  private userRoleSource = new BehaviorSubject('default message');
  pickeduserrole = this.userRoleSource.asObservable();

  private navigSource = new BehaviorSubject('default message');
  navigRoute = this.navigSource.asObservable();

  constructor() { }

  changePickedUser(user: string) {
    this.userSource.next(user);
  }

  changePickedProject(projectKey: string){
    this.projectSource.next(projectKey);
  }

  changePickedMeeting(meetingName: string){
    this.meetingSource.next(meetingName);
  }

  changePickedTask(taskKey: string){
    this.taskSource.next(taskKey);
  }

  changePickedUserRole(userrole: string){
    this.userRoleSource.next(userrole);
  }

  // changeNavigRoute(route: string){
  //   this.navigSource.next(route);
  // }
}
