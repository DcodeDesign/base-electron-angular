import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsWindowComponent } from './actions-window.component';

describe('ActionsWindowComponent', () => {
  let component: ActionsWindowComponent;
  let fixture: ComponentFixture<ActionsWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
