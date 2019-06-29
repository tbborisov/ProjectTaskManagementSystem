import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { animate, style, trigger, transition, query, stagger } from '../../../node_modules/@angular/animations';
import { Project } from '../project';
import { GetProjectsService } from '../get-projects.service';
import { PickedService } from '../picked.service';
import { NotificationsService } from './../notifications.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
  animations: [
    trigger('editProjectFallthrough', [
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
    trigger('buttonEditProjectFallthrough', [
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
export class EditProjectComponent implements OnInit {

  prevProjectKey : string

  currentProject: Project = {
    projectKey : '',
    projectTitle : ''
  }

  label: string = 'Edit project > '

  constructor(private data: PickedService, private getProjectService: GetProjectsService,
    private notificationsService: NotificationsService, private router : Router) { }

  ngOnInit() {
    if(localStorage.getItem('projectKey')){
      this.currentProject.projectKey = localStorage.getItem('projectKey')
      this.label = this.label + this.currentProject.projectKey;
    } else {
      this.router.navigate(['/newProjectLayout']);
    }
  }

  projectEditForm = new FormGroup({
    projectKey: new FormControl('', Validators.required),
    projectTitle: new FormControl('', Validators.required)
  });

  onKeyProjectKey(projectKey : string){
    this.currentProject.projectKey = projectKey;
  }

  onKeyProjectTitle(projectTitle: string){
    this.currentProject.projectTitle = projectTitle;
  }

  sendEditedProject(project: Project){
    localStorage.removeItem('projectKey');
    this.getProjectService.editProject(project, this.prevProjectKey ).subscribe(
      data => {
        this.notificationsService.notify('success', 'Sucess', 'Project editted successfully!');
        this.router.navigate(['/newProjectLayout']);
      },
      error => {
        this.notificationsService.notify('error', 'Error', 'Project was NOT editted!');
        this.router.navigate(['/newProjectLayout']);
      });
  }

  onSubmit(){
    this.sendEditedProject(this.currentProject);
  }

}
