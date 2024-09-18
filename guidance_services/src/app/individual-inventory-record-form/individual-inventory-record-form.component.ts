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
      average: ['', Validators.required],
      course: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      mobileNo: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      gender: ['', Validators.required],
      provincialAddress: ['', Validators.required],
      cityAddress: ['', Validators.required],

      // Educational Background
      elementarySchool: ['', Validators.required],
      elementaryLocation: ['', Validators.required],
      elementaryType: ['', Validators.required],
      elementaryYear: ['', Validators.required],
      elementaryAwards: [''],
      juniorSchool: ['', Validators.required],
      juniorLocation: ['', Validators.required],
      juniorType: ['', Validators.required],
      juniorYear: ['', Validators.required],
      juniorAwards: [''],
      seniorSchool: ['', Validators.required],
      seniorLocation: ['', Validators.required],
      seniorType: ['', Validators.required],
      seniorYear: ['', Validators.required],
      seniorAwards: [''],

      // Reasons for Enrollment
      lowerTuition: [false],
      safety: [false],
      space: [false],
      nearness: [false],
      transportation: [false],
      qualityEducation: [false],
      adequateFacilities: [false],
      pupEmployee: [false],
      facultyRelations: [false],
      scholarship: [false],
      others: [false],
      otherReasons: ['']
    });
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      console.log('Form Submitted', this.inventoryForm.value);
      // Handle form submission here
    } else {
      console.log('Form is invalid');
    }
  }
}
