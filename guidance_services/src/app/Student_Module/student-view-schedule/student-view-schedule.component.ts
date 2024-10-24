import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentsService } from '../../services/appointments.service'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-view-schedule',
  templateUrl: './student-view-schedule.component.html',
  styleUrls: ['./student-view-schedule.component.css']
})
export class StudentViewScheduleComponent implements OnInit {
  appointments: any[] = [];

  constructor(
    private appointmentsService: AppointmentsService, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.appointmentsService.getAppointments().subscribe(
      (data: any[]) => {
        // Filter out only accepted appointments
        this.appointments = data.filter(appointment => appointment.accepted);
        console.log('Accepted Appointments:', this.appointments);
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
  
  logout(): void {
    this.authService.logout();  
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
