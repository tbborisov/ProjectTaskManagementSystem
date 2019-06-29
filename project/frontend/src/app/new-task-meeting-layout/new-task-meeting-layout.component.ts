import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, query, stagger, animate } from '../../../node_modules/@angular/animations';
import { Meeting } from '../meeting';
import { GetProjectsService } from '../get-projects.service';
import { PickedService } from '../picked.service';
import { AuthuserService } from '../authuser.service';
import { ConfirmationService } from '../../../node_modules/primeng/api';
import { Router } from '../../../node_modules/@angular/router';
import { GetMeetingsService } from '../get-meetings.service';

@Component({
  selector: 'app-new-task-meeting-layout',
  templateUrl: './new-task-meeting-layout.component.html',
  styleUrls: ['./new-task-meeting-layout.component.css'], 
  animations: [
    trigger('newTaskMeetingLayoutFallthrough', [
      transition('* <=> *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(-30px)'}),
          stagger('50ms', 
          animate('550ms ease-out',
        style({opacity: 1, transform: 'translateY(0px)'})))
        ], {
          optional: true
        }),
        query(':leave', animate('50ms', style({opacity: 0})
      ), {
          optional: true
        })
      ])
    ])
  ]
})
export class NewTaskMeetingLayoutComponent implements OnInit {

  createCheck: boolean = true;
  proceed: boolean;
  pickedProject : boolean; 
  index = 0;
  clicked = -1;
  lastClicked = -1;
  projectKey : string = '';
  meet : Meeting = {
    meetingKey: '',
    meetingDate: ''
  }
  pickedMeeting: boolean;

  public displayedColumns = ['MEETING KEY','MEETING DATE'];

  meetings$: Meeting[];
  dataLoaded: boolean = false;
  isadmin : boolean = false;
  label: string = 'Manage task > '

  constructor(private meetings: GetMeetingsService, private data: PickedService, private authuser: AuthuserService,
    private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit() {
    if(this.authuser.getSessionStorageRole()==='A'){
      this.isadmin = true; 
    } 

    if(localStorage.getItem('projectKeyTask')){
      this.projectKey = localStorage.getItem('projectKeyTask');
      this.label = this.label + this.projectKey;

      this.meetings.getMeetings(this.projectKey).subscribe(
        meetings => {
          this.meetings$ = meetings;
          this.dataLoaded = true;
      });
    } else {
      this.router.navigate(['/newTaskProjectLayout']);
    }

    localStorage.removeItem('meetingKeyTask');
  }

  getValue(meetingKey: string){
    this.meet.meetingKey = meetingKey;
    this.data.changePickedMeeting(meetingKey);
  }

  select(i: number, meetingKey: string) {
    this.getValue(meetingKey);

    if(this.lastClicked === i){
      this.clicked = -1;
      this.lastClicked = -1;
      this.pickedMeeting = false;
    }else{
      this.clicked = i;
      this.lastClicked = i;
      this.pickedMeeting = true;
    }

    if(this.pickedMeeting){
      localStorage.setItem('meetingKeyTask', meetingKey);
      this.proceed = true;
    } else{
      this.proceed = false;
    }
  }


}
