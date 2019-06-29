import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, query, stagger, animate } from '../../../node_modules/@angular/animations';
import { Meeting } from '../meeting';
import { GetMeetingsService } from '../get-meetings.service';
import { PickedService } from '../picked.service';
import { AuthuserService } from '../authuser.service';
import { ConfirmationService } from '../../../node_modules/primeng/api';
import { Router } from '../../../node_modules/@angular/router';

import { NotificationsService } from './../notifications.service';


@Component({
  selector: 'app-new-meeting-layout',
  templateUrl: './new-meeting-layout.component.html',
  styleUrls: ['./new-meeting-layout.component.css'],
  animations: [
    trigger('newMeetingLayoutFallthrough', [
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
export class NewMeetingLayoutComponent implements OnInit {

  createCheck: boolean = true;
  editCheck: boolean;
  deleteCheck: boolean;
  pickedMeeting : boolean; 
  index = 0;
  clicked = -1;
  lastClicked = -1;
  projectKey : string = '';
  meet : Meeting = {
    meetingKey : '',
    meetingDate : ''
  }

  public displayedColumns = ['MEETING KEY','MEETING DATE'];

  meetings$: Meeting[];
  dataLoaded: boolean = false;
  isadmin : boolean = false;
  label: string = 'Manage meeting > ';

  constructor(private meetings: GetMeetingsService, private data: PickedService, private authuser: AuthuserService,
    private confirmationService: ConfirmationService, private router: Router, private readonly cdr: ChangeDetectorRef,
    private notificationsService: NotificationsService) {
     }

  ngOnInit() {
    if(this.authuser.getSessionStorageRole()==='A'){
      this.isadmin = true; 

      if(localStorage.getItem('projectKeyMeeting')){
        this.projectKey = localStorage.getItem('projectKeyMeeting')
        this.label = this.label + this.projectKey;
        
        this.meetings.getMeetings(this.projectKey).subscribe(
          meetings => {
            this.meetings$ = meetings;
            this.dataLoaded = true;
        });
        
      } else {
        this.router.navigate(['/newMeetingProjectLayout']);
      }
    } 

    localStorage.removeItem('meetingKeyMeeting');
  }

  private handleClick(type: string): number {
    return 123;
  }

  confirm(type: string){
    if(type === 'create'){
      this.router.navigate(['/createMeeting']);
    }else if(type === 'edit'){
      this.router.navigate(['/editMeeting']);
    }else{
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete ' + this.meet.meetingKey + ' ?',
        accept: () => {
          this.meetings.deleteMeeting(this.projectKey, this.meet).subscribe(
            data => {
              for (var _i = 0; _i < this.meetings$.length; _i++) {
                if(this.meetings$[_i].meetingKey === this.meet.meetingKey){
                  this.meetings$.splice(_i,1);
                  this.meetings$ = this.meetings$.slice();
                  this.cdr.detectChanges()
                }
              }
              this.notificationsService.notify('success', 'Sucess', 'Meeting deleted successfully!');
            
            },
            error => {
              this.notificationsService.notify('error', 'Error', 'Meeting was NOT deleted!');
            })
        }   
      }); 
    }
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
      localStorage.setItem('meetingKeyMeeting', meetingKey);
      this.deleteCheck = true;
      this.editCheck = true;
    } else{
      this.deleteCheck = false;
      this.editCheck = false;
    }
  }

}
