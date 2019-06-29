import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthuserService } from '../authuser.service';
import { GetUsersService } from '../get-users.service';
import { PickedService } from '../picked.service';
import { trigger, transition, query, style, stagger, animate } from '../../../node_modules/@angular/animations';
import { User } from '../user';
import { Router } from '../../../node_modules/@angular/router';
import { ConfirmationService } from '../../../node_modules/primeng/api';
import { NavigationEnd} from '@angular/router';

import { NotificationsService } from './../notifications.service';

@Component({
  selector: 'app-new-user-layout',
  templateUrl: './new-user-layout.component.html',
  styleUrls: ['./new-user-layout.component.css'],
  animations: [
    trigger('newUserLayoutFallthrough', [
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
export class NewUserLayoutComponent implements OnInit {


  createCheck: boolean = true;
  editCheck: boolean;
  deleteCheck: boolean;
  pickedUser : boolean; 
  index = 0;
  clicked = -1;
  lastClicked = -1;
  userName : string = '';

  public displayedColumns = ['USERNAME', 'FULL NAME', 'ROLE'];

  users$: User[];
  dataLoaded: boolean = false;
  isadmin : boolean = false;
  navigationSubscription;

  constructor(private users: GetUsersService, private data: PickedService, private authuser: AuthuserService,
    private confirmationService: ConfirmationService, private router: Router, private readonly cdr: ChangeDetectorRef,
    private notificationsService: NotificationsService) {
  }
  
  ngOnInit() {
    if(this.authuser.getSessionStorageRole()==='A'){
      this.isadmin = true; 
      this.users.getUsersFull().subscribe(
        users => {
          this.users$ = users;
          this.dataLoaded = true;
        }
      )
    } 

    localStorage.removeItem('userName');
  }

  confirm(type: string){
    if(type === 'create'){
      this.router.navigate(['/createUser']);
    }else if(type === 'edit'){
      localStorage.setItem('userName', this.userName);
      this.router.navigate(['/editUser']);
    }else{
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete ' + this.userName + ' ?',
        accept: () => {
          this.users.deleteUser(this.userName).subscribe(
            data => {
              for (var _i = 0; _i < this.users$.length; _i++) {
                if(this.users$[_i].username === this.userName){
                  this.users$.splice(_i,1);
                  this.users$ = this.users$.slice();
                  this.cdr.detectChanges()
                }
              }
              this.notificationsService.notify('success', 'Success', 'User deleted successfully!');
             // this.router.navigate(['/newUserLayout'])
            },
            error => {
              this.notificationsService.notify('error', 'Error', 'User was NOT deleted!');
            })
        }   
      }); 
    }
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
      this.deleteCheck = true;
      this.editCheck = true;
    } else{
      this.deleteCheck = false;
      this.editCheck = false;
    }
  }
}
