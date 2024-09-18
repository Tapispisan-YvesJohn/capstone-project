import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecordsService } from '../../services/records.service';

@Component({
  selector: 'app-student-pds',
  templateUrl: './student-pds.component.html',
  styleUrls: ['./student-pds.component.css']
})
export class StudentPdsComponent implements OnInit {
  inventoryForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private recordsService: RecordsService) { }

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
      otherReasons: [''],
      
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

      // Family Background
      fatherName: ['', Validators.required],
      fatherAge: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      fatherOccupation: ['', Validators.required],
      motherName: ['', Validators.required],
      motherAge: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      motherOccupation: ['', Validators.required],
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
