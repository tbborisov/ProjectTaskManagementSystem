import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, query, stagger, animate } from '../../../node_modules/@angular/animations';
import { MeetingTask } from '../meeting-task';
import { Task } from '../task';
import { GetTasksService } from '../get-tasks.service';
import { PickedService } from '../picked.service';
import { AuthuserService } from '../authuser.service';
import { ConfirmationService } from '../../../node_modules/primeng/api';
import { Router } from '../../../node_modules/@angular/router';

import { NotificationsService } from './../notifications.service';

@Component({
  selector: 'app-new-task-layout',
  templateUrl: './new-task-layout.component.html',
  styleUrls: ['./new-task-layout.component.css'],
  animations: [
    trigger('newTaskLayoutFallthrough', [
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
export class NewTaskLayoutComponent implements OnInit {

  createCheck: boolean = true;
  editCheck: boolean;
  deleteCheck: boolean;
  pickedTask : boolean; 
  index = 0;
  clicked = -1;
  lastClicked = -1;
  projectKey : string = '';
  meetingTask : MeetingTask = {
    meetingKey: '',
    taskKey: '',
    taskProgress: '',
    taskStatus: '',
    initialEstimation: 0,
    remainingTime: 0,
    hoursSpent: 0,
    comments: ''
  }
  updatemeeting: String = '';

  public displayedColumns = ['TASK KEY','TASK PROGRESS','TASK STATUS', 'INITIAL ESTIMATION', 'REMAINING TIME', 'HOURS SPENT', 'COMMENTS'];

  tasks$: Task[];
  dataLoaded: boolean = false;
  isadmin : boolean = false;
  navigationSubscription;
  
  label: string = 'Manage task > '

  constructor(private tasks: GetTasksService, private data: PickedService, private authuser: AuthuserService,
    private confirmationService: ConfirmationService, private router: Router, private readonly cdr: ChangeDetectorRef,
    private notificationsService: NotificationsService) {
     }

  ngOnInit() {
    
    if(this.authuser.getSessionStorageRole()==='A'){
      this.isadmin = true;
    } else {
      this.isadmin = false;
    }

    if(localStorage.getItem('projectKeyTask')){
      if(localStorage.getItem('meetingKeyTask')){
        this.projectKey = localStorage.getItem('projectKeyTask');
        this.meetingTask.meetingKey = localStorage.getItem('meetingKeyTask');
        this.label = this.label + this.projectKey + ' > ' + this.meetingTask.meetingKey
        this.updatemeeting = new String(this.meetingTask.meetingKey);
        this.updatemeeting = this.updatemeeting.replace('#','!');
        this.meetingTask.meetingKey = this.updatemeeting.toString();

        this.tasks.getTasks(this.projectKey, this.meetingTask.meetingKey).subscribe(
          (tas: Task[] )=> {
            this.tasks$ = tas;
            this.dataLoaded = true;
          },
          err => {
          });
      } else {
        this.router.navigate(['/newTaskMeetingLayout']);
      }
    } else {
      this.router.navigate(['/newTaskProjectLayout']);
    }

    localStorage.removeItem('taskKeyTask');
  }

  handleClick(type: string){

  }

  confirm(type: string){
    if(type === 'create'){
      this.router.navigate(['/createTask']);
    }else if(type === 'edit'){
      this.router.navigate(['/editTask']);
    }else{
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete ' + this.meetingTask.taskKey + ' ?',
        accept: () => {
          this.tasks.deleteTask(this.projectKey, this.meetingTask).subscribe(
            data => {
              for (var _i = 0; _i < this.tasks$.length; _i++) {
                if(this.tasks$[_i].taskKey === this.meetingTask.taskKey){
                  this.tasks$.splice(_i,1);
                  this.tasks$ = this.tasks$.slice();
                  this.cdr.detectChanges()
                }
               }
               this.notificationsService.notify('success', 'Sucess', 'Task deleted successfully!');
            },
            error => {
              this.notificationsService.notify('error', 'Error', 'Task was NOT deleted!');
            })
        }   
      }); 
    }
  }

  getValue(taskKey: string){
    this.meetingTask.taskKey = taskKey;
    this.data.changePickedTask(taskKey);
  }

  select(i: number, taskKey: string) {
    this.getValue(taskKey);

    if(this.lastClicked === i){
      this.clicked = -1;
      this.lastClicked = -1;
      this.pickedTask = false;
    }else{
      this.clicked = i;
      this.lastClicked = i;
      this.pickedTask = true;
    }

    if(this.pickedTask){
      localStorage.setItem('taskKeyTask', taskKey);
      this.deleteCheck = true;
      this.editCheck = true;
    } else{
      this.deleteCheck = false;
      this.editCheck = false;
    }
  }

}
