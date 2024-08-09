import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent implements OnInit {
  inventoryForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      // Personal Information
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      civilStatus: ['', Validators.required],
      religion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required],
      dob: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      mobileNo: ['', Validators.required],
      address: ['', Validators.required],
      emergencyContact: ['', Validators.required],

      // Educational Background
      elementarySchool: ['', Validators.required],
      juniorHighSchool: ['', Validators.required],
      seniorHighSchool: ['', Validators.required],

      // Family Background
      fatherName: ['', Validators.required],
      fatherAge: ['', Validators.required],
      fatherOccupation: ['', Validators.required],
      motherName: ['', Validators.required],
      motherAge: ['', Validators.required],
      motherOccupation: ['', Validators.required],

      // Health
      vision: ['', Validators.required],
      hearing: ['', Validators.required],
      generalHealth: ['', Validators.required],

      // Test Results
      testDate: ['', Validators.required],
      testAdministered: ['', Validators.required],
      testResults: ['', Validators.required],
      testDescription: ['', Validators.required],

      // Significant Notes
      incidentDate: ['', Validators.required],
      incident: ['', Validators.required],
      remarks: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      console.log('Form Submitted', this.inventoryForm.value);
      // Add form submission logic here
    } else {
      console.log('Form not valid');
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
