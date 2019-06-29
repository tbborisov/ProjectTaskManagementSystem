import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { Validators } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '../../../node_modules/@angular/animations';
import { User } from '../user';
import { GetUsersService } from '../get-users.service';
import { PickedService } from '../picked.service';
import { AuthuserService } from '../authuser.service';
import { LoginUserService } from '../login-user.service';
import { MessageService } from 'primeng/api';
import { NotificationsService } from './../notifications.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  animations: [
    trigger('createUserFallthrough', [
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
    trigger('buttonCreateUserFallthrough', [
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
export class CreateUserComponent implements OnInit {
  
  userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('',Validators.required),
      fullName: new FormControl('', Validators.required),
      //role: new FormControl('', [Validators.required, Validators.pattern('[AU]')])
  });

  selectedValue: string = 'U';

  currentUser: User = {
    username : '',
    password: '',
    fullName: '',
    role: 'U'
  }

  confirmPassword: string= '';
  currentRole: string ='';
  isadmin: boolean = false;
  loaded: boolean = false;
  check: boolean = false;

  constructor(private getUserService: GetUsersService, private authuser: AuthuserService,
    private messageService: MessageService,private notificationsService: NotificationsService,
  private router : Router) { }

  ngOnInit() {
    this.check = this.authuser.getSessionStorageRole()==='A';
    if(this.check){
      this.isadmin = true; 
      this.loaded = true;
    }
  }

  addSingleSucess() {
    this.messageService.add({severity:'success', summary:'Success', detail:'User created successfully'});
  }

  addSignleError(){
    this.messageService.add({severity:'error', summary:'ERROR', detail:'User was NOT created'});
  }

  clear() {
    this.messageService.clear();
  }

  onKeyUserName(userName: string) {
      this.currentUser.username = userName;
  }

  onKeyPassword(password: string){
      this.currentUser.password = password;
  }

  onKeyConfirmPassword(confirmPassword: string)  {
      this.confirmPassword = confirmPassword;
  }

  onKeyFullName(fullname: string){
      this.currentUser.fullName = fullname;
  }

  onKeyRole(role: string){
    this.currentUser.role = role;
  }
  
  sendUser(user: User){
    this.getUserService.createUser(user).subscribe(
      data => {
        this.notificationsService.notify('success', 'Sucess', 'User created successfully!');
        this.router.navigate(['/newUserLayout']);
      },
      error => {
        this.notificationsService.notify('error', 'Error', 'Error on user creation!');
        this.router.navigate(['/newUserLayout']);
      });
  }

  onSubmit(){
    this.currentUser.role = this.selectedValue;
    this.sendUser(this.currentUser);
  }

  checkRole(){
    return !this.userForm.controls.role.valid;
  }

  checkPasswords(){
    return !(this.confirmPassword === this.currentUser.password);
  }
}
