import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRbacComponent } from './admin-rbac.component';

describe('AdminRbacComponent', () => {
  let component: AdminRbacComponent;
  let fixture: ComponentFixture<AdminRbacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRbacComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRbacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
