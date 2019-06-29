import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, query, stagger, animate } from '../../../node_modules/@angular/animations';
import { Project } from '../project';
import { GetProjectsService } from '../get-projects.service';
import { PickedService } from '../picked.service';
import { AuthuserService } from '../authuser.service';
import { ConfirmationService } from '../../../node_modules/primeng/api';
import { Router } from '../../../node_modules/@angular/router';
import { localStorageFactory } from 'angular-webstorage-service';

@Component({
  selector: 'app-new-task-project-layout',
  templateUrl: './new-task-project-layout.component.html',
  styleUrls: ['./new-task-project-layout.component.css'], 
  animations: [
    trigger('newTaskProjectLayoutFallthrough', [
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
export class NewTaskProjectLayoutComponent implements OnInit {

  createCheck: boolean = true;
  proceed: boolean;
  pickedProject : boolean; 
  index = 0;
  clicked = -1;
  lastClicked = -1;
  projectKey : string = '';

  public displayedColumns = ['PROJECT KEY','PROJECT TITLE'];

  projects$: Project[];
  dataLoaded: boolean = false;
  isadmin : boolean = false;
  currentUser: string = '';

  constructor(private projects: GetProjectsService, private data: PickedService, private authuser: AuthuserService,
    private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit() {
    if(this.authuser.getSessionStorageRole()==='A'){
      this.isadmin = true; 
      this.projects.getProjects().subscribe(
        projects => {
          this.projects$ = projects;
          this.dataLoaded = true;
        }
      )
    }else{
      this.currentUser = this.authuser.getSessionStorageUsername();
      this.projects.getUserProjects(this.currentUser).subscribe(
        projects => {
          this.projects$ = projects;
          this.dataLoaded = true;
        }
      )
    }

    localStorage.removeItem('meetingKeyTask');
    localStorage.removeItem('taskKeyTask');
  }

  handleClick(type: string){

  }

  confirm(type: string){
    if(type === 'create'){
      this.router.navigate(['/createProject']);
    }else if(type === 'edit'){
      this.router.navigate(['/editProject']);
    }else{
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete ' + this.projectKey + ' ?',
        accept: () => {
          this.projects.deleteProject(this.projectKey).subscribe(
            data => {
              location.reload();
            },
            error => {
              location.reload();
            })
        }   
      }); 
    }
  }

  getValue(projectKey: string){
    this.projectKey = projectKey;
    this.data.changePickedProject(projectKey);
  }

  select(i: number, projectKey: string) {
    this.getValue(projectKey);

    if(this.lastClicked === i){
      this.clicked = -1;
      this.lastClicked = -1;
      this.pickedProject = false;
    }else{
      this.clicked = i;
      this.lastClicked = i;
      this.pickedProject = true;
    }

    if(this.pickedProject){
      localStorage.setItem('projectKeyTask', projectKey)
      this.proceed = true;
    } else{
      this.proceed = false;
    }
  }

}
