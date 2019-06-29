import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '../../../node_modules/@angular/forms';
import { style, animate, transition, trigger, query, stagger } from '../../../node_modules/@angular/animations';
import { PickedService } from '../picked.service';
import { User } from '../user';
import { GetUsersService } from '../get-users.service';
import { AuthuserService } from '../authuser.service';

import { NotificationsService } from './../notifications.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  animations: [
    trigger('editUserFallthrough', [
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
    trigger('buttonEditUserFallthrough', [
      transition('* <=> *', [
        query(':enter', [
          style({opacity: 0, transform: 'translatex(30px)'}),
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
export class EditUserComponent implements OnInit {

  selectedValue: string = 'U';
  confirmPassword: string= '';

  currentUser: User = {
    username : '',
    password: '',
    fullName: '',
    role: ''
  }

  editUserForm = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('',Validators.required),
    fullName: new FormControl('', Validators.required),
    //role: new FormControl('', [Validators.required, Validators.pattern('[AU]')])
});

  loaded: boolean = false;
  label: string = 'Edit user > ';

  constructor(private userauth: AuthuserService, private data: PickedService, private notificationsService: NotificationsService,
    private getUserService: GetUsersService, private router: Router) { }

  ngOnInit() {
      if(localStorage.getItem('userName')){
        this.currentUser.username = localStorage.getItem('userName')
        this.label = this.label + this.currentUser.username;
      } else {
        this.router.navigate(['/newUserLayout']);
      }
  }

  onSubmit(){
    this.currentUser.role = this.selectedValue;
    this.sendEditedUser(this.currentUser);
  }

  onKeyPassword(password : string){
    this.currentUser.password = password;
  }

  onKeyConfirmPassword(confirmPassword: string)  {
    this.confirmPassword = confirmPassword;
}

  onKeyFullname(fullname: string){
    this.currentUser.fullName = fullname;
  }
  
  onKeyRole(role: string){
    this.currentUser.role = role;
  }

  sendEditedUser(user: User){
    localStorage.removeItem('userName');
    this.getUserService.editUser(user).subscribe(
      data => {
        this.notificationsService.notify('success', 'Sucess', 'User editted successfully!');
        this.router.navigate(['/newUserLayout']);
      },
      error => {
        this.notificationsService.notify('error', 'Error', 'User was NOT eddited!');
        this.router.navigate(['/newUserLayout']);
      });
  }

  checkRole(){
    return !this.editUserForm.controls.role.valid;
  }

  checkPasswords(){
    return !(this.confirmPassword === this.currentUser.password);
  }
}
