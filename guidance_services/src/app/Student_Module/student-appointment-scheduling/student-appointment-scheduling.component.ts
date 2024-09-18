import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import Snackbar
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-student-appointment-scheduling',
  templateUrl: './student-appointment-scheduling.component.html',
  styleUrls: ['./student-appointment-scheduling.component.css']
})
export class StudentAppointmentSchedulingComponent implements OnInit {
  appointmentForm: FormGroup;
  minDate: Date; // Update to use Date type

  morningTimes: { display: string, value: string }[] = [
    { display: "8:00 AM - 9:00 AM", value: "08:00" },
    { display: "9:00 AM - 10:00 AM", value: "09:00" },
    { display: "10:00 AM - 11:00 AM", value: "10:00" },
    { display: "11:00 AM - 12:00 PM", value: "11:00" }
  ];

  afternoonTimes: { display: string, value: string }[] = [
    { display: "1:00 PM - 2:00 PM", value: "13:00" },
    { display: "2:00 PM - 3:00 PM", value: "14:00" },
    { display: "3:00 PM - 4:00 PM", value: "15:00" },
    { display: "4:00 PM - 5:00 PM", value: "16:00" }
  ];

  constructor(
    private fb: FormBuilder,  
    private appointmentService: AppointmentsService,
    private snackBar: MatSnackBar  // Inject MatSnackBar service
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today; // Set minDate to today's date

    // Initialize the form
    this.appointmentForm = this.fb.group({
      appointment_date: [null, Validators.required], // Date field
      appointment_time: ['', Validators.required], // Time field
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Format the date as YYYY-MM-DD before submitting the form
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading 0 to month if necessary
    const day = ('0' + date.getDate()).slice(-2); // Add leading 0 to day if necessary
    return `${year}-${month}-${day}`;
  }

  // Function to show Snackbar notifications
  openSnackBar(message: string, action: string, className: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [className],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      // Format the appointment date before sending to the backend
      const formattedDate = this.formatDate(new Date(this.appointmentForm.value.appointment_date));
      const appointmentData = {
        ...this.appointmentForm.value,
        appointment_date: formattedDate
      };

      this.appointmentService.scheduleAppointment(appointmentData)
        .subscribe(response => {
          // On success, show success snackbar and reset the form
          this.openSnackBar('Appointment scheduled successfully!', 'Close', 'success-snackbar');
          this.appointmentForm.reset();  // Clear the form fields
        }, error => {
          // On error, show error snackbar
          this.openSnackBar('Error scheduling appointment.', 'Close', 'error-snackbar');
          console.error('Error scheduling appointment:', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
