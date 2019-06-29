import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssignLayoutComponent } from './new-assign-layout.component';

import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { GetUsersService } from '../get-users.service';
import { GetProjectsService } from '../get-projects.service';
import { PickedService } from '../picked.service';
import { AuthuserService } from '../authuser.service';
import { Router } from '../../../node_modules/@angular/router';
import { NotificationsService } from '../notifications.service';
import { ConfirmationService } from '../../../node_modules/primeng/api';

describe('NewAssignLayoutComponent (isolated test)', () => {
  let component: NewAssignLayoutComponent;
  let fixture: ComponentFixture<NewAssignLayoutComponent>;
/*
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAssignLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssignLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
*/
  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should create index with 0 value', () => {
     expect(component.index).toEqual(0);
  });
});
