import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeetingLayoutComponent } from './new-meeting-layout.component';

describe('NewMeetingLayoutComponent', () => {
  let component: NewMeetingLayoutComponent;
  let fixture: ComponentFixture<NewMeetingLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMeetingLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMeetingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
