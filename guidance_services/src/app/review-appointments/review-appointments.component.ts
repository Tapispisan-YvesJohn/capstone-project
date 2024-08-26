import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsService } from '../services/appointments.service';

@Component({
  selector: 'app-review-appointments',
  templateUrl: './review-appointments.component.html',
  styleUrls: ['./review-appointments.component.css']
})
export class ReviewAppointmentsComponent implements OnInit {
  appointments: any[] = [];

  constructor (
    private appointmentsService: AppointmentsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.appointmentsService.getAppointments().subscribe(
      (data: any[]) => {
        this.appointments = data;
        console.log('Appointments fetched:', this.appointments);
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  viewAppointment(appointment: any) {
    console.log('Viewing appointment:', appointment);
  }

  cancelAppointment(id: number) {
    this.appointmentsService.cancelAppointment(id).subscribe(
      (response) => {
        console.log('Appointment cancelled:', response);
        this.appointments = this.appointments.filter(a => a.id !== id);
      },
      (error) => {
        console.error('Error cancelling appointment:', error);
      }
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
