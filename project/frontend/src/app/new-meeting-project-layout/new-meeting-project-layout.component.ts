import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, query, stagger, animate } from '../../../node_modules/@angular/animations';
import { Project } from '../project';
import { GetProjectsService } from '../get-projects.service';
import { PickedService } from '../picked.service';
import { AuthuserService } from '../authuser.service';
import { ConfirmationService } from '../../../node_modules/primeng/api';
import { Router } from '../../../node_modules/@angular/router';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-new-meeting-project-layout',
  templateUrl: './new-meeting-project-layout.component.html',
  styleUrls: ['./new-meeting-project-layout.component.css'], 
  animations: [
    trigger('newMeetingProjectLayoutFallthrough', [
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
export class NewMeetingProjectLayoutComponent implements OnInit {

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

  constructor(private projects: GetProjectsService, private data: PickedService, private authuser: AuthuserService,
    private confirmationService: ConfirmationService, private router: Router, private readonly cdr: ChangeDetectorRef,
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    if(this.authuser.getSessionStorageRole()==='A'){
      this.isadmin = true; 
      this.projects.getProjects().subscribe(
        projects => {
          this.projects$ = projects;
          this.dataLoaded = true;
        }
      )
    } 

    localStorage.removeItem('projectKeyMeeting');
  }

  handleClick(type: string){

  }

  // confirm(type: string){
  //   if(type === 'create'){
  //     this.router.navigate(['/createProject']);
  //   }else if(type === 'edit'){
  //     this.router.navigate(['/editProject']);
  //   }else{
  //     this.confirmationService.confirm({
  //       message: 'Are you sure that you want to delete ' + this.projectKey + ' ?',
  //       accept: () => {
  //         this.projects.deleteProject(this.projectKey).subscribe(
  //           data =>  {
  //             for (var _i = 0; _i < this.projects$.length; _i++) {
  //               if(this.projects$[_i].projectKey === this.projectKey){
  //                 this.projects$.splice(_i,1);
  //                 this.projects$ = this.projects$.slice();
  //                 this.cdr.detectChanges()
  //               }
  //             }
  //             this.notificationsService.notify('success', 'Sucess', 'Meeting deleted successfully!');
            
  //           },
  //           error => {
  //             this.notificationsService.notify('error', 'Error', 'Meeting was NOT deleted!');
  //           })
  //       }   
  //     }); 
  //   }
  // }

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
      localStorage.setItem('projectKeyMeeting', projectKey)
      this.proceed = true;
    } else{
      this.proceed = false;
    }
  }

}
