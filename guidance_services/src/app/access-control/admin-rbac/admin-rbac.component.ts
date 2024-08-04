import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-rbac',
  templateUrl: './admin-rbac.component.html',
  styleUrls: ['./admin-rbac.component.css']
})
export class AdminRbacComponent implements OnInit {
  adminForm: FormGroup;

  roles = [
    { id: 1, name: 'Sub Admin', permissions: [] },
    { id: 2, name: 'Student Assistant', permissions: [] }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.adminForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      newRole: [''],
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
      // Handle form submission, e.g., send data to the backend
    } else {
      console.log('Form is invalid');
      this.logValidationErrors();
    }
  }

  logValidationErrors() {
    Object.keys(this.adminForm.controls).forEach(key => {
      const controlErrors = this.adminForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(errorKey => {
          console.log(`Key control: ${key}, errorKey: ${errorKey}, errorValue: `, controlErrors[errorKey]);
        });
      }
    });
  }

  addRole() {
    const roleName = this.adminForm.get('newRole').value;
    if (roleName) {
      const newRole = {
        id: this.roles.length + 1,
        name: roleName,
        permissions: []
      };
      this.roles.push(newRole);
      this.adminForm.get('newRole').reset();
    }
  }

  get usernameControl() {
    return this.adminForm.get('username');
  }

  get emailControl() {
    return this.adminForm.get('email');
  }

  get passwordControl() {
    return this.adminForm.get('password');
  }

  get roleControl() {
    return this.adminForm.get('role');
  }
}