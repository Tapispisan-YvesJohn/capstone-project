import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAppointmentsComponent } from './review-appointments.component';

describe('ReviewAppointmentsComponent', () => {
  let component: ReviewAppointmentsComponent;
  let fixture: ComponentFixture<ReviewAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewAppointmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
