import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-individual-inventory-record-form',
  templateUrl: './individual-inventory-record-form.component.html',
  styleUrls: ['./individual-inventory-record-form.component.css']
})
export class IndividualInventoryRecordFormComponent implements OnInit {

  inventoryForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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
}
