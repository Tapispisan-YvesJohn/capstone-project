import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsService } from '../services/appointments.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar

@Component({
  selector: 'app-review-appointments',
  templateUrl: './review-appointments.component.html',
  styleUrls: ['./review-appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  currentView: string = 'review';
  userInfo: any = {};
  showModal: boolean = false;  // To control the modal visibility
  selectedAppointment: any = null;  // To hold the selected appointment

  constructor(
    private appointmentsService: AppointmentsService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar  // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();

    const token = localStorage.getItem('token');
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
    this.selectedAppointment = appointment;  // Store the selected appointment
    this.showModal = true;  // Show the modal
  }

  cancelAppointment(id: number) {
    this.snackBar.open('Are you sure you want to cancel this appointment?', 'Yes', { 
      duration: 5000
    }).onAction().subscribe(() => {
      this.appointmentsService.cancelAppointment(id).subscribe(
        (response) => {
          console.log('Appointment cancelled:', response);
          this.appointments = this.appointments.filter(a => a.id !== id);
          this.snackBar.open('Appointment successfully cancelled.', 'Close', {
            duration: 3000
          });
        },
        (error) => {
          console.error('Error cancelling appointment:', error);
          this.snackBar.open('Error cancelling appointment.', 'Close', {
            duration: 3000
          });
        }
      );
    });
  }

  acceptAppointment(id: number) {
    this.snackBar.open('Are you sure you want to accept this appointment?', 'Yes', { 
      duration: 5000
    }).onAction().subscribe(() => {
      this.appointmentsService.acceptAppointment(id).subscribe(
        (response) => {
          console.log('Appointment accepted:', response);
          this.updateAppointmentStatus(id, true);
          this.snackBar.open('Appointment successfully accepted.', 'Close', {
            duration: 3000
          });
        },
        (error) => {
          console.error('Error accepting appointment:', error);
          this.snackBar.open('Error accepting appointment.', 'Close', {
            duration: 3000
          });
        }
      );
    });
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

  logout(): void {
    this.authService.logout();  
  }

  closeModal(): void {
    this.showModal = false;  // Close the modal
  }
}
