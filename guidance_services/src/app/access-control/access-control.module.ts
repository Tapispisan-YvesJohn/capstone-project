import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRbacComponent } from './admin-rbac/admin-rbac.component';

@NgModule({
  declarations: [AdminRbacComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AdminRbacComponent]
})
export class AccessControlModule { }
