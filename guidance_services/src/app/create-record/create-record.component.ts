import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecordsService } from '../services/records.service';  // Adjust the path as needed

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent implements OnInit {
  inventoryForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      // Personal Information
      personal_information: this.fb.group({
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        middleName: ['', Validators.required],
        civilStatus: ['', Validators.required],
        religion: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        course: ['', Validators.required],
        dob: ['', Validators.required],
        placeOfBirth: ['', Validators.required],
        mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
        address: ['', Validators.required],
        emergencyContact: ['', Validators.required],
      }),
  
      // Educational Background
      educational_background: this.fb.group({
        elementarySchool: ['', Validators.required],
        juniorHighSchool: ['', Validators.required],
        seniorHighSchool: ['', Validators.required],
      }),
  
      // Family Background
      family_background: this.fb.group({
        fatherName: ['', Validators.required],
        fatherAge: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
        fatherOccupation: ['', Validators.required],
        motherName: ['', Validators.required],
        motherAge: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
        motherOccupation: ['', Validators.required],
      }),
  
      // Health
      health_record: this.fb.group({
        vision: ['', Validators.required],
        hearing: ['', Validators.required],
        generalHealth: ['', Validators.required],
      }),
  
      // Test Results
      test_results: this.fb.group({
        testDate: ['', Validators.required],
        testAdministered: ['', Validators.required],
        testResults: ['', Validators.required],
        testDescription: ['', Validators.required],
      }),
  
      // Significant Notes
      significant_notes: this.fb.group({
        incidentDate: ['', Validators.required],
        incident: ['', Validators.required],
        remarks: ['', Validators.required],
      }),
    });
  }  

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      this.recordsService.createRecord(this.inventoryForm.value).subscribe({
        next: (response) => {
          console.log('Form Submitted successfully', response);
        },
        error: (error) => {
          console.error('Error submitting form', error);
        }
      });
    } else {
      console.log('Form not valid');
      this.markFormGroupTouched(this.inventoryForm);
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}
