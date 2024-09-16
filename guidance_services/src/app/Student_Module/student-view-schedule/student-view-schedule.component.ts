import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service'; // Updated path based on the folder structure

@Component({
  selector: 'app-student-view-schedule',
  templateUrl: './student-view-schedule.component.html',
  styleUrls: ['./student-view-schedule.component.css']
})
export class StudentViewScheduleComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentsService: AppointmentsService) {}

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
}
