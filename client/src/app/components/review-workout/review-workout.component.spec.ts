import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewWorkoutComponent } from './review-workout.component';

describe('ReviewWorkoutComponent', () => {
  let component: ReviewWorkoutComponent;
  let fixture: ComponentFixture<ReviewWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
