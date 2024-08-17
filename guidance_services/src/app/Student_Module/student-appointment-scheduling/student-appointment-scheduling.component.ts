import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-appointment-scheduling',
  templateUrl: './student-appointment-scheduling.component.html',
  styleUrls: ['./student-appointment-scheduling.component.css']
})
export class StudentAppointmentSchedulingComponent implements OnInit {
  appointmentForm: FormGroup;
  minDate: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = this.formatDate(today);

    this.appointmentForm = this.fb.group({
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onDateChange(event: any): void {
    const selectedDate = new Date(event.target.value);
    const today = new Date();
    if (selectedDate < today) {
      this.appointmentForm.controls['appointmentDate'].setErrors({ pastDate: true });
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      console.log('Appointment Scheduled:', this.appointmentForm.value);

    } else {
      console.log('Form is invalid');
    }
  }
}
