import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeetingProjectLayoutComponent } from './new-meeting-project-layout.component';

describe('NewMeetingProjectLayoutComponent', () => {
  let component: NewMeetingProjectLayoutComponent;
  let fixture: ComponentFixture<NewMeetingProjectLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMeetingProjectLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMeetingProjectLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
