import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewScheduleComponent } from './student-view-schedule.component';

describe('StudentViewScheduleComponent', () => {
  let component: StudentViewScheduleComponent;
  let fixture: ComponentFixture<StudentViewScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentViewScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentViewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
