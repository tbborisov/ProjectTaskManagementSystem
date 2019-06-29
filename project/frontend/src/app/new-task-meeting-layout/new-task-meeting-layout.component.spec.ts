import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskMeetingLayoutComponent } from './new-task-meeting-layout.component';

describe('NewTaskMeetingLayoutComponent', () => {
  let component: NewTaskMeetingLayoutComponent;
  let fixture: ComponentFixture<NewTaskMeetingLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskMeetingLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskMeetingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
