import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '../../../node_modules/@angular/animations';
import { Project } from '../project';
import { GetProjectsService } from '../get-projects.service';
import { AuthuserService } from '../authuser.service';

import { NotificationsService } from './../notifications.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
  animations: [
    trigger('createProjectFallthrough', [
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
    trigger('buttonCreateProjectFallthrough', [
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
export class CreateProjectComponent implements OnInit {
  
  constructor(private getProjectService: GetProjectsService, private authuser: AuthuserService, 
    private notificationsService: NotificationsService, private router: Router
  ) { }

  project: Project = {
    projectKey : '',
    projectTitle: ''
  }

  isadmin: boolean = false;
  loaded: boolean = false;
  check: boolean = false;


  ngOnInit() {
    this.check = this.authuser.getSessionStorageRole()==='A';
    if(this.check){
      this.isadmin = true; 
      this.loaded = true;
    }
  }

  projectForm = new FormGroup({
    projectKey: new FormControl('', Validators.required),
    projectTitle: new FormControl('', Validators.required)
  });

  onSubmit(){
    this.sendProject(this.project);
  }

  sendProject(project: Project){
    this.getProjectService.createProject(project).subscribe(
      data => {
        this.notificationsService.notify('success', 'Sucess', 'Project created successfully!');
        this.router.navigate(['/newProjectLayout']);
      },
      error => {
        this.notificationsService.notify('error', 'Error', 'Project was NOT created!');
        this.router.navigate(['/newProjectLayout']);
      });
  }

  onKeyProjectKey(projectKey: string){
    this.project.projectKey = projectKey;
  }

  onKeyProjectTitle(projectTitle: string){
    this.project.projectTitle = projectTitle;
  }

}
