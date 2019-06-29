import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { trigger, transition, style, query, stagger, animate } from '../../../node_modules/@angular/animations';
import { LoginUserService } from '../login-user.service';
import { User } from '../user';
import { UserLogin } from '../user-login';
import { TouchSequence } from '../../../node_modules/@types/selenium-webdriver';
import { PickedService } from '../picked.service';
import { AuthuserService } from '../authuser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loginFallthrough', [
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
    trigger('buttonLoginFallthrough', [
      transition('* <=> *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(-30px)'}),
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
export class LoginComponent implements OnInit {

  flag: boolean = false;
  currentUser: UserLogin = {
    username: '',
    role: ''
  };
  usernameLogin: string = '';
  passwordLogin: string = '';

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router : Router, private loginService: LoginUserService, private data: PickedService,
        private authuser: AuthuserService) { 

  }

  ngOnInit() {
    if(this.authuser.getSessionStorageRole()){
      this.router.navigate(['/menu']);
    }
  }

  onKeyUser(usernameLogin: string){
    this.usernameLogin = usernameLogin;
  }

  onKeyPass(passwordLogin: string){
    this.passwordLogin = passwordLogin;
  }

  navig() {
    this.router.navigate(['/menu']); 
  }

  showError() : boolean{
    return this.flag;
  }

  onSubmit(event: any){
    this.loginService.getIfValidUser(this.usernameLogin, this.passwordLogin).subscribe(
      user => { 
        this.currentUser = user; 
        this.authuser.storeOnSessionStorageUserRole(this.currentUser.username,
               this.currentUser.role);
        
        this.navig();
      },
      err => { 
        this.flag = true 
      }
    )
  }
}
