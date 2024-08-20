import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPdsComponent } from './student-pds.component';

describe('StudentPdsComponent', () => {
  let component: StudentPdsComponent;
  let fixture: ComponentFixture<StudentPdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentPdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentPdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
