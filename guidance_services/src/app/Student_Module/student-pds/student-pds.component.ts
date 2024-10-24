import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecordsService } from '../../services/records.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls

@Component({
  selector: 'app-student-pds',
  templateUrl: './student-pds.component.html',
  styleUrls: ['./student-pds.component.css']
})
export class StudentPdsComponent implements OnInit {
  inventoryForm: FormGroup;
  formErrorMessage: string = '';
  isApplicationOpen: boolean = false; // To track if the application is open

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
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private http: HttpClient // Inject HttpClient
  ) { }

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      // All form controls as mentioned in your current code...
    });

    // Fetch the current application status from the backend
    this.getApplicationStatus();
  }

  // Fetch the current application status from the server
  getApplicationStatus(): void {
    this.http.get<any>('/api/get-status').subscribe(
      (response) => {
        this.isApplicationOpen = response.is_application_open;
        if (!this.isApplicationOpen) {
          this.snackBar.open('Application is currently closed. You cannot submit the form.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar-warning']
          });
        }
      },
      (error) => {
        console.error('Error fetching application status:', error);
        this.snackBar.open('Error fetching application status. Please try again later.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['snackbar-error']
        });
      }
    );
  }

  onSubmit(): void {
    if (!this.isApplicationOpen) {
      // Prevent form submission if the application is closed
      this.snackBar.open('Application is closed. You cannot submit the form.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['snackbar-error']
      });
      return;
    }

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

  get reasonsArray(): FormArray {
    return this.inventoryForm.get('reasons') as FormArray;
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

  logout(): void {
    this.authService.logout();  
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
