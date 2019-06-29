import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from '../../node_modules/primeng/calendar';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ButtonModule } from 'primeng/button';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MatTableModule} from '@angular/material/table';
import { MatSidenavModule, MATERIAL_SANITY_CHECKS} from '@angular/material';
import { NewProjectLayoutComponent } from './new-project-layout/new-project-layout.component';
import { NewMeetingLayoutComponent } from './new-meeting-layout/new-meeting-layout.component';
import { NewTaskLayoutComponent } from './new-task-layout/new-task-layout.component';
import { NewUserLayoutComponent} from './new-user-layout/new-user-layout.component';
import { NewMeetingProjectLayoutComponent } from './new-meeting-project-layout/new-meeting-project-layout.component';
import { NewTaskProjectLayoutComponent } from './new-task-project-layout/new-task-project-layout.component';
import { NewTaskMeetingLayoutComponent } from './new-task-meeting-layout/new-task-meeting-layout.component';
import { NewAssignLayoutComponent } from './new-assign-layout/new-assign-layout.component';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationsService } from './notifications.service';
import { GrowlModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    CreateUserComponent,
    CreateProjectComponent,
    CreateMeetingComponent,
    CreateTaskComponent,
    EditUserComponent,
    EditProjectComponent,
    EditMeetingComponent,
    EditTaskComponent,
    NewProjectLayoutComponent,
    NewMeetingLayoutComponent,
    NewTaskLayoutComponent,
    NewMeetingProjectLayoutComponent,
    NewUserLayoutComponent,
    NewTaskProjectLayoutComponent,
    NewTaskMeetingLayoutComponent,
    NewAssignLayoutComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PanelMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    HttpClientModule,
    CalendarModule,
    CommonModule,
    StorageServiceModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    MatTableModule,
    MatSidenavModule,
    ToastModule,
    GrowlModule
  ],
  providers: [ConfirmationService, MessageService,NotificationsService, {
    provide: MATERIAL_SANITY_CHECKS,
    useValue: false
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
