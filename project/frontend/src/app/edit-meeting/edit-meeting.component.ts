import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { trigger, transition, query, style, animate, stagger } from '../../../node_modules/@angular/animations';
import { Meeting } from '../meeting';
import { PickedService } from '../picked.service';
import { GetMeetingsService } from '../get-meetings.service';

import { NotificationsService } from './../notifications.service';
import { Route, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.css'],
  animations: [
    trigger('editMeetingFallthrough', [
      transition('* <=> *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateX(-30px)'}),
          stagger('350ms', 
          animate('550ms ease-out',
        style({opacity: 1, transform: 'translateX(0px)'})))
        ], {
          optional: true
        }),
        query(':leave', animate('50ms', style({opacity: 0})
      ), {
          optional: true
        })
      ])
    ]),
    trigger('buttonEditMeetingFallthrough', [
      transition('* <=> *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateX(30px)'}),
          stagger('350ms', 
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
export class EditMeetingComponent implements OnInit {

  prevMeetingKey : string= '';
  prevProjectKey : string = '';
  dayOfMonth : string = '';
  month : string = '';

  currentMeeting: Meeting = {
    meetingKey : '',
    meetingDate : ''
  }

  label: string = 'Edit meeting > '

  constructor(private data: PickedService, private getMeetingService: GetMeetingsService, private notificationsService: NotificationsService,
  private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('projectKeyMeeting')){
      if(localStorage.getItem('meetingKeyMeeting')){
        this.prevProjectKey = localStorage.getItem('projectKeyMeeting');
        this.prevMeetingKey = localStorage.getItem('meetingKeyMeeting');
        this.currentMeeting.meetingKey = this.prevMeetingKey;
        this.label = this.label + this.prevProjectKey + ' > ' + this.prevMeetingKey;
      } else {
        this.router.navigate(['newMeetingLayout']);
      }
    } else {
      this.router.navigate(['/newMeetingProjectLayout']);
    }
  }

  meetingEditForm = new FormGroup({
    //meetingDate: new FormControl('', [Validators.required,
    //  Validators.pattern('^(0[1-9]|([12][0-9])|(3[01]))\/(0[1-9]|1[012])\/\\d\\d\\d\\d\\s(0[1-9]|1[0-9]|2[0-3]):([0-5][0-9])$')])
    meetingDate: new FormControl('', Validators.required)
  });

  onKeyMeetingDate(date: Date){
    this.dayOfMonth = date.getDate() < 10 ? '0'+date.getDate() : '' + date.getDate();
    this.month = (date.getUTCMonth() + 1) < 10 ? '0'+(date.getUTCMonth() + 1) : ''+(date.getUTCMonth()+1); 
    this.currentMeeting.meetingDate = this.dayOfMonth + '/' + this.month + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() ;
  }

  sendEditedMeeting(meeting: Meeting){
    this.getMeetingService.editMeeting(meeting, this.prevProjectKey).subscribe(
      data => {
        this.notificationsService.notify('success', 'Sucess', 'Meeting editted successfully!');
        this.router.navigate(['/newMeetingLayout']);
      },
      error => {
        this.notificationsService.notify('error', 'Error', 'Meeting was NOT editted!');
        this.router.navigate(['/newMeetingLayout']);
      });
  }

  onSubmit(){
    this.sendEditedMeeting(this.currentMeeting);
  }
}
