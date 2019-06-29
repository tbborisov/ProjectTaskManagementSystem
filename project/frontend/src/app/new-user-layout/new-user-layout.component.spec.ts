import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserLayoutComponent } from './new-user-layout.component';

describe('NewUserLayoutComponent', () => {
  let component: NewUserLayoutComponent;
  let fixture: ComponentFixture<NewUserLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
