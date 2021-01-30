import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbuttonGroupComponent } from './checkbutton-group.component';

describe('CheckbuttonGroupComponent', () => {
  let component: CheckbuttonGroupComponent;
  let fixture: ComponentFixture<CheckbuttonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckbuttonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbuttonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
