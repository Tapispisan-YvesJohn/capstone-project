import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsService } from '../services/appointments.service';

@Component({
  selector: 'app-review-appointments',
  templateUrl: './review-appointments.component.html',
  styleUrls: ['./review-appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  currentView: string = 'review';

  constructor(
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
    // You can add more logic here for what happens when an appointment is viewed
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

  acceptAppointment(id: number) {
    this.appointmentsService.acceptAppointment(id).subscribe(
      (response) => {
        console.log('Appointment accepted:', response);
        this.updateAppointmentStatus(id, true);
      },
      (error) => {
        console.error('Error accepting appointment:', error);
      }
    );
  }

  updateAppointmentStatus(id: number, accepted: boolean): void {
    this.appointments = this.appointments.map(a => a.id === id ? { ...a, accepted } : a);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  viewSchedule(): void {
    this.currentView = 'schedule';
    console.log('View Schedule selected');
  }

  reviewAppointments(): void {
    this.currentView = 'review';
    console.log('Review Appointments selected');
  }

  filteredAppointments(): any[] {
    if (this.currentView === 'review') {
      return this.appointments.filter(a => !a.accepted); 
    } else {
      return this.appointments.filter(a => a.accepted);  
    }
  }
}
