import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskLayoutComponent } from './new-task-layout.component';

describe('NewTaskLayoutComponent', () => {
  let component: NewTaskLayoutComponent;
  let fixture: ComponentFixture<NewTaskLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
