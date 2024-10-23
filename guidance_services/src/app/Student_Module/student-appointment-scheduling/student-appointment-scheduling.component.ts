import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-student-appointment-scheduling',
  templateUrl: './student-appointment-scheduling.component.html',
  styleUrls: ['./student-appointment-scheduling.component.css']
})
export class StudentAppointmentSchedulingComponent implements OnInit {
  appointmentForm: FormGroup;
  minDate: Date;
  bookedTimes: string[] = []; // Array to store booked times for the selected date

  morningTimes: { display: string, value: string, disabled: boolean }[] = [
    { display: "8:00 AM - 9:00 AM", value: "08:00", disabled: false },
    { display: "9:00 AM - 10:00 AM", value: "09:00", disabled: false },
    { display: "10:00 AM - 11:00 AM", value: "10:00", disabled: false },
    { display: "11:00 AM - 12:00 PM", value: "11:00", disabled: false }
  ];

  afternoonTimes: { display: string, value: string, disabled: boolean }[] = [
    { display: "1:00 PM - 2:00 PM", value: "13:00", disabled: false },
    { display: "2:00 PM - 3:00 PM", value: "14:00", disabled: false },
    { display: "3:00 PM - 4:00 PM", value: "15:00", disabled: false },
    { display: "4:00 PM - 5:00 PM", value: "16:00", disabled: false }
  ];

  constructor(
    private fb: FormBuilder,  
    private router: Router,
    private appointmentService: AppointmentsService,
    private snackBar: MatSnackBar  
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today;

    // Initialize the form
    this.appointmentForm = this.fb.group({
      appointment_date: [null, Validators.required],
      appointment_time: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Watch for changes to the appointment_date field and check for booked times
    this.appointmentForm.get('appointment_date')?.valueChanges.subscribe(date => {
      this.checkBookedTimes(date);
    });
  }

  // Function to check booked times for the selected date
  checkBookedTimes(date: Date): void {
    const formattedDate = this.formatDate(new Date(date));

    this.appointmentService.getAppointmentsByDate(formattedDate).subscribe(bookedAppointments => {
      this.bookedTimes = bookedAppointments.map(appointment => appointment.appointment_time);

      // Update morning and afternoon times to reflect availability
      this.updateTimeSlots();
    });
  }

  // Update the availability of time slots based on booked times
  updateTimeSlots(): void {
    this.morningTimes.forEach(time => {
      time.disabled = this.bookedTimes.includes(time.value);
    });

    this.afternoonTimes.forEach(time => {
      time.disabled = this.bookedTimes.includes(time.value);
    });
  }

  // Format the date as YYYY-MM-DD before submitting the form
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const formattedDate = this.formatDate(new Date(this.appointmentForm.value.appointment_date));
      const appointmentData = {
        ...this.appointmentForm.value,
        appointment_date: formattedDate
      };

      this.appointmentService.scheduleAppointment(appointmentData)
        .subscribe(response => {
          this.openSnackBar('Appointment scheduled successfully!', 'Close', 'success-snackbar');
          this.appointmentForm.reset();
        }, error => {
          if (error.status === 409) {
            this.openSnackBar('The selected time is already booked.', 'Close', 'error-snackbar');
          } else {
            this.openSnackBar('Error scheduling appointment.', 'Close', 'error-snackbar');
          }
        });
    }
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

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
