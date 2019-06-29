import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, query, stagger, animate, group } from '../../../node_modules/@angular/animations';
import { AuthuserService } from '../authuser.service';
import { LoginUserService } from '../login-user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('menuFade', [
      transition('* <=> *', [    
          query(':enter', [
            style({ opacity:0 }),
            animate('1000ms ease-in-out', style({ opacity:1 }))
          ],{ optional: true }),
          query(':leave', [
            style({ opacity:1 }),
            animate('1000ms ease-in-out', style({ opacity:0 }))
          ], { optional: true }),
        ])
      ])
    ]
})
export class MenuComponent implements OnInit {

  constructor( private authuser: AuthuserService, private loginservice : LoginUserService
    ,private logserv: LoginUserService
  ) { }

  items: MenuItem[];

  ngOnInit() {
    if(this.authuser.getSessionStorageRole()==='A'){
    this.items = [
        {
            label: 'User management',
            items: [{
                    label: 'Manage user', 
                    icon: 'pi pi-fw pi-plus',
                    url: "newUserLayout",
                    },
                  ]
        },
        {
            label: 'Project management',
            items: [{
                    label: 'Manage project', 
                    icon: 'pi pi-fw pi-plus',
                    url: 'newProjectLayout'},
                    ]
        },
        {
            label: 'Meeting management',
            items: [{
              label: 'Manage meeting', 
              icon: 'pi pi-fw pi-plus',
              url: 'newMeetingProjectLayout'},
              ]
        },
        {
            label: 'Progress managment',
            items: [{
              label: 'Manage task', 
              icon: 'pi pi-fw pi-plus',
              url: 'newTaskProjectLayout'},
              ]
        },
        {
              label: 'Quit', icon: 'pi pi-fw pi-times', url: '/', command: () => { this.authuser.removeSeesionStorage();}
        }
    ];
  } else {
    this.items = [
      {
          label: 'Progress managment',
          items: [{
            label: 'Manage task', 
            icon: 'pi pi-fw pi-plus',
            url: 'newTaskProjectLayout'},
            ]
      },
      {
            label: 'Quit', icon: 'pi pi-fw pi-times', url: '/', command: () => { this.authuser.removeSeesionStorage();}
      }
  ];
  }

    
}
}