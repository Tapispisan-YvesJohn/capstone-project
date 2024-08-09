import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualInventoryRecordFormComponent } from './individual-inventory-record-form.component';

describe('IndividualInventoryRecordFormComponent', () => {
  let component: IndividualInventoryRecordFormComponent;
  let fixture: ComponentFixture<IndividualInventoryRecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndividualInventoryRecordFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndividualInventoryRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
