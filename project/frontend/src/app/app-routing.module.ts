import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent} from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateUserComponent} from './create-user/create-user.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditUserComponent} from './edit-user/edit-user.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AuthGuard } from './auth/auth.guard'
import { PermGuard } from './auth/perm.guard';
import { NewUserLayoutComponent } from './new-user-layout/new-user-layout.component';
import { NewProjectLayoutComponent } from './new-project-layout/new-project-layout.component';
import { NewMeetingProjectLayoutComponent } from './new-meeting-project-layout/new-meeting-project-layout.component';
import { NewMeetingLayoutComponent } from './new-meeting-layout/new-meeting-layout.component';
import { NewTaskProjectLayoutComponent } from './new-task-project-layout/new-task-project-layout.component';
import { NewTaskMeetingLayoutComponent } from './new-task-meeting-layout/new-task-meeting-layout.component';
import { NewTaskLayoutComponent } from './new-task-layout/new-task-layout.component';
import { NewAssignLayoutComponent } from './new-assign-layout/new-assign-layout.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'newUserLayout',
    component: NewUserLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createUser',
    component: CreateUserComponent,
    canActivate: [PermGuard]
  },
  {
    path: 'createProject',
    component: CreateProjectComponent,
    canActivate: [PermGuard]
  },
  {
    path: 'createMeeting',
    component: CreateMeetingComponent,
    canActivate: [PermGuard]
  },
  {
    path: 'createTask',
    component: CreateTaskComponent,
    canActivate: [PermGuard]
  },
  {
    path: 'editUser',
    component: EditUserComponent,
    canActivate: [PermGuard]
  },
  {
    path: 'editProject',
    component: EditProjectComponent,
    canActivate: [PermGuard]
  }, 
  {
    path: 'editMeeting',
    component: EditMeetingComponent,
    canActivate: [PermGuard]
  },
  {
    path: 'editTask',
    component: EditTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newProjectLayout',
    component: NewProjectLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newMeetingProjectLayout',
    component: NewMeetingProjectLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newMeetingLayout',
    component: NewMeetingLayoutComponent,
    canActivate: [PermGuard]
  },
  {
    path: 'newTaskProjectLayout',
    component: NewTaskProjectLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newTaskMeetingLayout',
    component: NewTaskMeetingLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newTaskLayout',
    component: NewTaskLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newAssignLayout',
    component: NewAssignLayoutComponent,
    canActivate: [PermGuard]
  },
  { 
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
