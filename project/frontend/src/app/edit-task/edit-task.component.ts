import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '../../../node_modules/@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '../../../node_modules/@angular/animations';
import { PickedService } from '../picked.service';
import { GetTasksService } from '../get-tasks.service';
import { Task } from '../task';
import { MeetingTask } from '../meeting-task';

import { NotificationsService } from './../notifications.service';
import { Router } from '../../../node_modules/@angular/router';
import { localStorageFactory } from 'angular-webstorage-service';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
  animations: [
    trigger('editTaskFallthrough', [
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
    trigger('buttonEditTaskFallthrough', [
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
export class EditTaskComponent implements OnInit {

  prevMeetingKey : string = '';
  prevProjectKey : string = '';
  prevTaskKey : string = '';
  selectedValue: string = 'I';

  currentMTask : MeetingTask = {
    meetingKey: '',
    taskKey: '',
    taskProgress: '',
    taskStatus: '',
    initialEstimation: 0,
    remainingTime: 0,
    hoursSpent: 0,
    comments: ''
  };
  
   label: string = 'Edit task > ';

  constructor(private data: PickedService, private getMeetingService: GetTasksService,
    private notificationsService: NotificationsService, private router: Router) { }

  ngOnInit() {

    if(localStorage.getItem('projectKeyTask')){
      if(localStorage.getItem('meetingKeyTask')){
        if(localStorage.getItem('taskKeyTask')){
          this.prevProjectKey = localStorage.getItem('projectKeyTask');
          this.prevMeetingKey = localStorage.getItem('meetingKeyTask');
          this.currentMTask.meetingKey = this.prevMeetingKey;
          this.prevTaskKey = localStorage.getItem('taskKeyTask');
          this.currentMTask.taskKey = this.prevTaskKey;

          this.label = this.label + this.prevProjectKey + ' > ' + this.prevMeetingKey + ' > ' + this.prevTaskKey;
        } else {
          this.router.navigate(['/newTaskLayout'])
        }
      } else {
        this.router.navigate(['/newTaskMeetingLayout'])
      }
    } else {
      this.router.navigate(['/newTaskProjectLayout']);
    }
    
  }

  taskEditForm = new FormGroup({
    taskProgress: new FormControl('', [Validators.required, 
      Validators.maxLength(4), 
      Validators.pattern('^([0-9]|[1-9][0-9]|100)%$')]),
    //taskStatus: new FormControl('', [Validators.required, Validators.pattern('[DIOR]')]),
    //remainingTime: new FormControl('', Validators.required),
    hoursSpent: new FormControl('', Validators.required),
    comments: new FormControl('', Validators.required)
  });

  sendEditedTask(){
    this.getMeetingService.editTask(this.prevProjectKey, this.currentMTask).subscribe(
      data => {
        this.notificationsService.notify('success', 'Sucess', 'Task editted successfully!');
        this.router.navigate(['/newTaskLayout']);
      },
      error => {
        this.notificationsService.notify('error', 'Error', 'Project was NOT editted!');
        this.router.navigate(['/newTaskLayout']);
      });
  }

  onSubmit(){
    this.currentMTask.taskStatus = this.selectedValue;
    this.sendEditedTask();
  }

  checkTaskProgress(){
    return !this.taskEditForm.controls.taskProgress.valid;
  }

  checkTaskStatus(){
    return !this.taskEditForm.controls.taskStatus.valid;
  }

  onKeyTaskProgress(taskProgress: string){
    this.currentMTask.taskProgress = taskProgress;
  }

  onKeyTaskStatus(taskStatus: string){
    this.currentMTask.taskStatus = taskStatus;
  }

  onKeyRemainingTime(remainingTime: number){
    this.currentMTask.remainingTime = remainingTime;
  }

  onKeyHoursSpent(hoursSpent: number){
    this.currentMTask.hoursSpent = hoursSpent;
  }

  onKeyComments(comments: string){
    this.currentMTask.comments = comments;
  }
}
