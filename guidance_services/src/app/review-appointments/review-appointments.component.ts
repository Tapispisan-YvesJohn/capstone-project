import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsService } from '../services/appointments.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-review-appointments',
  templateUrl: './review-appointments.component.html',
  styleUrls: ['./review-appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  currentView: string = 'review';
  userInfo: any = {};

  constructor(
    private appointmentsService: AppointmentsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();

    const token = localStorage.getItem('token'); // Assuming token is stored in local storage
    if (token) {
      this.authService.getUserInfo(token).subscribe(
        (data) => {
          this.userInfo = data;
        },
        (error) => {
          console.error('Error retrieving user info:', error);
        }
      );
    }
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
    const confirmCancel = confirm('Are you sure you want to cancel this appointment?');
    if (confirmCancel) {
      this.appointmentsService.cancelAppointment(id).subscribe(
        (response) => {
          console.log('Appointment cancelled:', response);
          this.appointments = this.appointments.filter(a => a.id !== id);
        },
        (error) => {
          console.error('Error cancelling appointment:', error);
        }
      );
    } else {
      console.log('Appointment cancellation cancelled.');
    }
  }

  acceptAppointment(id: number) {
    const confirmAccept = confirm('Are you sure you want to accept this appointment?');
    if (confirmAccept) {
      this.appointmentsService.acceptAppointment(id).subscribe(
        (response) => {
          console.log('Appointment accepted:', response);
          this.updateAppointmentStatus(id, true);
        },
        (error) => {
          console.error('Error accepting appointment:', error);
        }
      );
    } else {
      console.log('Appointment acceptance cancelled.');
    }
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
