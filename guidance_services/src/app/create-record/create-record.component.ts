import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecordsService } from '../services/records.service';  

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent implements OnInit {
  inventoryForm: FormGroup;
  formErrorMessage: string = '';

  // Labels for reasons checkboxes
  reasonLabels: string[] = [
    'Lower tuition fee',
    'Safety of the place',
    'Spacious Campus',
    'Nearness of home to school',
    'Accessible to transportation',
    'Better quality of education',
    'Adequate School Facilities',
    'Son / Daughter of PUP Employee',
    'Closer Student-Faculty Relations',
    'Expecting Scholarship Offer'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private recordsService: RecordsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      // Personal Information
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: ['', Validators.required],
      civilStatus: ['', Validators.required],
      religion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required],
      birthDate: ['', Validators.required],
      birthPlace: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      provincialAddress: ['', Validators.required],
      cityAddress: ['', Validators.required],
      emergencyContact: ['', Validators.required],
      emergencyPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      emergencyEmail: ['', [Validators.required, Validators.email]],
      employer: [''], // Added employer field
      relationship: ['', Validators.required],
      average: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      height: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      weight: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      gender: ['', Validators.required],  // Add this for gender (radio buttons)

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
      otherSchool: [''],  // Added "Other" school field

      // Family Background
      fatherName: ['', Validators.required],
      fatherAge: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      fatherOccupation: ['', Validators.required],
      motherName: ['', Validators.required],
      motherAge: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      motherOccupation: ['', Validators.required],
      fatherEducation: ['', Validators.required],
      motherEducation: ['', Validators.required],
      fatherContact: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      motherContact: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      fatherCompany: [''],
      motherCompany: [''],
      relationshipStatus: ['', Validators.required],  // Added parent's relationship status
      guardianName: [''],
      guardianAddress: [''],

      // Monthly Income
      monthlyIncome: ['', Validators.required], // Added income field

      // Siblings and family info
      siblingsTotal: [0, Validators.required],
      brothers: [0, Validators.required],
      sisters: [0, Validators.required],
      employed: [0, Validators.required],
      supportStudies: [0, Validators.required],
      supportFamily: [0, Validators.required],
      financialSupport: [''],
      allowance: [0, Validators.required],

      // Health Information
      vision: [''],
      visionIssue: [''],
      hearing: [''],
      hearingIssue: [''],
      mobility: [''],
      mobilityIssue: [''],
      speech: [''],
      speechIssue: [''],
      generalHealth: [''],
      generalHealthIssue: [''],

      // Psychological Consultations
      consultedWith: [''],
      consultationReason: [''],
      startDate: [''],
      sessions: [0],
      endDate: [''],

      // Test Results
      testDate: [''],
      testAdministered: [''],
      rs: [''],
      pr: [''],
      description: [''],

      // Significant Notes
      noteDate: [''],
      incident: [''],
      remarks: [''],

      // Checkbox for Reasons of Enrollment as an array
      reasons: this.fb.array(this.reasonLabels.map(() => this.fb.control(false))),
      otherReasons: [''],
    });
  }

  get reasonsArray(): FormArray {
    return this.inventoryForm.get('reasons') as FormArray;
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
          this.formErrorMessage = ''; 
        },
        error: (error) => {
          console.error('Error submitting form', error);
          this.formErrorMessage = 'An error occurred while creating the record. Please check the form and try again.'; 
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
      this.snackBar.open('Error creating record. Please try again.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['snackbar-error']
      });
      this.markFormGroupTouched(this.inventoryForm);
      this.logInvalidControls(this.inventoryForm);  // Log the invalid controls
    }
  }  

  private logInvalidControls(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control && control.invalid) {
        console.error(`Invalid control: ${key}, Errors:`, control.errors);
      }
    });
  }  

  navigateBack(): void {
    this.router.navigate(['/student-record']); 
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
