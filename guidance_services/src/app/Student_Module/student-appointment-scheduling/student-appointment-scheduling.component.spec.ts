import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAppointmentSchedulingComponent } from './student-appointment-scheduling.component';

describe('StudentAppointmentSchedulingComponent', () => {
  let component: StudentAppointmentSchedulingComponent;
  let fixture: ComponentFixture<StudentAppointmentSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAppointmentSchedulingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentAppointmentSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
