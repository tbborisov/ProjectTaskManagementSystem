import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectLayoutComponent } from './new-project-layout.component';

describe('NewProjectLayoutComponent', () => {
  let component: NewProjectLayoutComponent;
  let fixture: ComponentFixture<NewProjectLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjectLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
