import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskProjectLayoutComponent } from './new-task-project-layout.component';

describe('NewTaskProjectLayoutComponent', () => {
  let component: NewTaskProjectLayoutComponent;
  let fixture: ComponentFixture<NewTaskProjectLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskProjectLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskProjectLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
