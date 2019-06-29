import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '../../../node_modules/@angular/animations';
import { Task } from '../task';
import { GetTasksService } from '../get-tasks.service';
import { PickedService } from '../picked.service';
import { Meeting } from '../meeting';
import { MeetingTask } from '../meeting-task';

import { NotificationsService } from './../notifications.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  animations: [
    trigger('createTaskFallthrough', [
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
    trigger('buttonCreateTaskFallthrough', [
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
export class CreateTaskComponent implements OnInit {

  meetingtask : MeetingTask = {
    meetingKey: '',
    taskKey: '',
    taskProgress: '',
    taskStatus: '',
    initialEstimation: 0,
    remainingTime: 0,
    hoursSpent: 0,
    comments: ''
  }

  currentProject : string = '';
  selectedValue: string = 'I';
  label: string = 'Create task > ';

  constructor(private getTaskService: GetTasksService, private data: PickedService,
    private notificationsService: NotificationsService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('projectKeyTask')){
      if(localStorage.getItem('meetingKeyTask')){
        this.currentProject = localStorage.getItem('projectKeyTask');
        this.meetingtask.meetingKey = localStorage.getItem('meetingKeyTask');

        this.label = this.label + this.currentProject + ' > ' + this.meetingtask.meetingKey;
      } else {
        this.router.navigate(['/newTaskMeetingLayout'])
      }
    } else {
      this.router.navigate(['/newTaskProjectLayout']);
    }
  }

  taskForm = new FormGroup({
    taskKey: new FormControl('', Validators.required),
    taskProgress: new FormControl('', [Validators.required, 
                                       Validators.maxLength(4), 
                                       Validators.pattern('^([0-9]|[1-9][0-9]|100)%$')]),
    //taskStatus: new FormControl('', [Validators.required, Validators.pattern('[DIOR]')]),
    initialEstimation: new FormControl('', Validators.required),
    remainingTime: new FormControl('', Validators.required),
    hoursSpent: new FormControl('', Validators.required),
    comments: new FormControl('', Validators.required)
  });

  onSubmit(){
    this.meetingtask.taskStatus = this.selectedValue;
    this.getTaskService.createTask(this.currentProject, this.meetingtask).subscribe(
      data => {
        this.notificationsService.notify('success', 'Sucess', 'Task created successfully!');
        this.router.navigate(['/newTaskLayout']);
      },
      error => {
        this.notificationsService.notify('error', 'Error', 'Task was NOT created!');
        this.router.navigate(['/newTaskLayout']);
      }
    );
  }

  checkTaskProgress(){
    return !this.taskForm.controls.taskProgress.valid;
  }

  checkTaskStatus(){
    return !this.taskForm.controls.taskStatus.valid;
  }

  onKeyTaskKey(taskKey: string){
    this.meetingtask.taskKey = taskKey;
  }

  onKeyTaskProgress(taskProgress: string){
    this.meetingtask.taskProgress = taskProgress;
  }

  onKeyTaskStatus(taskStatus: string){
    this.meetingtask.taskStatus = taskStatus;
  }

  onKeyInitialEstimation(initialEstimation: number){
    this.meetingtask.initialEstimation = initialEstimation;
  }

  onKeyRemainingTime(remainingTime: number){
    this.meetingtask.remainingTime = remainingTime;
  }

  onKeyHoursSpent(hoursSpent: number){
    this.meetingtask.hoursSpent = hoursSpent;
  }

  onKeyComments(comments: string){
    this.meetingtask.comments = comments;
  }
}
