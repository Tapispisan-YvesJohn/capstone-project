import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-student-appointment-scheduling',
  templateUrl: './student-appointment-scheduling.component.html',
  styleUrls: ['./student-appointment-scheduling.component.css']
})
export class StudentAppointmentSchedulingComponent implements OnInit {
  appointmentForm: FormGroup;
  minDate: string;
  
  // Define time slots in 24-hour format for morning (AM) and afternoon (PM)
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
    private appointmentService: AppointmentsService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = this.formatDate(today);

    // Initialize the appointment form
    this.appointmentForm = this.fb.group({
      appointment_date: ['', Validators.required],
      appointment_time: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Handle changes to the selected date
  onDateChange(event: any): void {
    const selectedDate = new Date(event.target.value);
    const today = new Date();
    if (selectedDate < today) {
      this.appointmentForm.controls['appointment_date'].setErrors({ pastDate: true });
    }
  }

  // Format the date to yyyy-mm-dd
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.appointmentService.scheduleAppointment(this.appointmentForm.value)
        .subscribe(response => {
          console.log('Appointment scheduled:', response);
        }, error => {
          console.error('Error scheduling appointment:', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
