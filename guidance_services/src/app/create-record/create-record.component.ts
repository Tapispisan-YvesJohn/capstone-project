import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecordsService } from '../services/records.service';  // Adjust the path as needed

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent implements OnInit {
  inventoryForm: FormGroup;
  formErrorMessage: string = '';  // Error message for form submission failure

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private recordsService: RecordsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
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

      // Educational Background
      elementarySchool: ['', Validators.required],
      juniorHighSchool: ['', Validators.required],
      seniorHighSchool: ['', Validators.required],

      // Family Background
      fatherName: ['', Validators.required],
      fatherAge: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      fatherOccupation: ['', Validators.required],
      motherName: ['', Validators.required],
      motherAge: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
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
      this.recordsService.createRecord(this.inventoryForm.value).subscribe({
        next: (response) => {
          console.log('Form Submitted successfully', response);
          this.snackBar.open('Record created successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          });
          this.inventoryForm.reset();
          this.formErrorMessage = ''; // Clear any previous error messages
        },
        error: (error) => {
          console.error('Error submitting form', error);
          this.formErrorMessage = 'An error occurred while creating the record. Please check the form and try again.'; // Set error message
          this.snackBar.open('Error creating record. Please try again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar-error']
          });
        }
      });
    } else {
      console.log('Form not valid');
      this.formErrorMessage = 'Please fill out all required fields correctly before submitting.';
      this.markFormGroupTouched(this.inventoryForm);
    }
  }

  // Back button logic
  navigateBack(): void {
    this.router.navigate(['/student-record']);  // Adjust the route as needed, e.g., to homepage or student-record
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
