import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewApplicantsComponent } from './review-applicants.component';

describe('ReviewApplicantsComponent', () => {
  let component: ReviewApplicantsComponent;
  let fixture: ComponentFixture<ReviewApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewApplicantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
