import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { animate, query, transition, style, stagger, trigger } from '../../../node_modules/@angular/animations';
import { CalendarModule } from 'primeng/calendar';
import { Meeting } from '../meeting';
import { GetMeetingsService } from '../get-meetings.service';
import { PickedService } from '../picked.service';

import { NotificationsService } from './../notifications.service';
import { Router } from '../../../node_modules/@angular/router';
@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css'],
  animations: [
    trigger('createMeetingFallthrough', [
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
    trigger('buttonCreateMeetingFallthrough', [
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
export class CreateMeetingComponent implements OnInit {

  meeting: Meeting = {
    meetingKey: '', 
    meetingDate: ''
  }
  currentProject : string = '';
  dayOfMonth: string = '';
  month: string = '';
  label: string = 'Create meeting > '

  constructor( private getMeetingService: GetMeetingsService, private data: PickedService,
    private notificationsService: NotificationsService, private router : Router) { }

  ngOnInit() {
    if(localStorage.getItem('projectKeyMeeting')){
      if(localStorage.getItem('meetingKeyMeeting')){
        this.currentProject = localStorage.getItem('projectKeyMeeting');

        this.label = this.label + this.currentProject;
      } else {
        this.router.navigate(['newMeetingLayout']);
      }
    } else {
      this.router.navigate(['/newMeetingProjectLayout']);
    }
  }

  meetingForm = new FormGroup({
    
    //meetingDate: new FormControl('', [Validators.required, 
    //      Validators.pattern('^(0[1-9]|([12][0-9])|(3[01]))\/(0[1-9]|1[012])\/\\d\\d\\d\\d\\s(0[1-9]|1[0-9]|2[0-3]):([0-5][0-9])$')]),
    meetingDate: new FormControl('', Validators.required)
  });

  onKeyMeetingDate(date: Date){
      this.dayOfMonth = date.getDate() < 10 ? '0'+date.getDate() : '' + date.getDate();
      this.month = (date.getUTCMonth() + 1) < 10 ? '0'+(date.getUTCMonth() + 1) : ''+(date.getUTCMonth()+1); 
      this.meeting.meetingDate = this.dayOfMonth + '/' + this.month + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() ;
  }

  onSubmit(){
    this.getMeetingService.createMeeting(this.currentProject, this.meeting).subscribe(
      data => {
        this.notificationsService.notify('success', 'Sucess', 'Meeting created successfully!');
        this.router.navigate(['/newMeetingLayout']);
      },
      error => {
        this.notificationsService.notify('error', 'Error', 'Meeting was NOT created!');
        this.router.navigate(['/newMeetingLayout']);
      }
    );
  }

}
