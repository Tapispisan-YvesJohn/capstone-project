import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-rbac',
  templateUrl: './admin-rbac.component.html',
  styleUrls: ['./admin-rbac.component.css']
})
export class AdminRbacComponent {
  adminForm: FormGroup;
  roles = [
    { id: 1, name: 'Sub Admin', permissions: [] },
    { id: 2, name: 'Student Assistant', permissions: [] }
  ];

  constructor(private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      create: [false],
      edit: [false],
      view: [false],
      delete: [false],
      print: [false]
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      console.log(this.adminForm.value);
    }
  }

  addRole(roleName: string) {
    if (roleName) {
      const newRole = {
        id: this.roles.length + 1,
        name: roleName,
        permissions: []
      };
      this.roles.push(newRole);
    }
  }
}
