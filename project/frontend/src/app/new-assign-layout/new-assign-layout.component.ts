import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, query, stagger, animate } from '../../../node_modules/@angular/animations';
import { User } from '../user';
import { GetUsersService } from '../get-users.service';
import { PickedService } from '../picked.service';
import { AuthuserService } from '../authuser.service';
import { ConfirmationService } from '../../../node_modules/primeng/api';
import { Router } from '../../../node_modules/@angular/router';
import { GetProjectsService } from '../get-projects.service';
import { NotificationsService } from './../notifications.service';

@Component({
  selector: 'app-new-assign-layout',
  templateUrl: './new-assign-layout.component.html',
  styleUrls: ['./new-assign-layout.component.css'],
  animations: [
    trigger('newAssignLayoutFallthrough', [
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
export class NewAssignLayoutComponent implements OnInit {

  createCheck: boolean = true;
  editCheck: boolean;
  deleteCheck: boolean;
  pickedUser : boolean = false; 
  index = 0;
  clicked = -1;
  lastClicked = -1;
  userName : string = '';
  currentProject : string ='';
  assigne : boolean = false;

  public displayedColumns = ['USERNAME', 'FULL NAME', 'ROLE'];

  users$: User[];
  assignedUsers: User[];
  dataLoaded: boolean = false;
  isadmin : boolean = false;
  navigationSubscription;
  label: string = 'Assign users to project > ';

  constructor(private users: GetUsersService, private projcts: GetProjectsService, private data: PickedService, private authuser: AuthuserService,
    private confirmationService: ConfirmationService, private router: Router, private readonly cdr: ChangeDetectorRef,
    private notificationsService: NotificationsService) {
      
     }

  ngOnInit() {
    if(this.authuser.getSessionStorageRole()==='A'){
      this.isadmin = true; 
      
      if(localStorage.getItem('projectKey')){
        this.currentProject = localStorage.getItem('projectKey')
        this.label = this.label + this.currentProject;
      
        this.users.getUsersAssignFull(this.currentProject).subscribe(
          users => {
            this.users$ = users;
            this.dataLoaded = true;
          });
        this.users.getUsersAssignFullAssigned(this.currentProject).subscribe(
          users => {
            this.assignedUsers = users;
            this.dataLoaded = true;
        });
      } else {
        this.router.navigate(['newProjectLayout']);
      }
    }
  }

  assign(){
    this.projcts.assignUsersToProject(this.currentProject,this.userName).subscribe(
      data => {
        for (var _i = 0; _i < this.users$.length; _i++) {
          if(this.users$[_i].username === this.userName){
            this.assignedUsers.push(this.users$[_i]);
            this.assignedUsers = this.assignedUsers.slice();
            this.users$.splice(_i,1);
            this.users$ = this.users$.slice();
            this.cdr.detectChanges();
            this.pickedUser = false;
          }
        }
        this.notificationsService.notify('success', 'Sucess', 'User assigned successfully!');
      },
      error => {
        this.notificationsService.notify('error', 'Error', 'User was NOT assigned!');
      }
    );
  }

  getValue(username: string){
    this.userName = username;
    this.data.changePickedUser(username);
  }

  select(i: number, username: string) {
    this.getValue(username);

    if(this.lastClicked === i){
      this.clicked = -1;
      this.lastClicked = -1;
      this.pickedUser = false;
    }else{
      this.clicked = i;
      this.lastClicked = i;
      this.pickedUser = true;
    }

    if(this.pickedUser){
      this.assigne = true;
    } else{
      this.assigne = false;
    }
  }

}
