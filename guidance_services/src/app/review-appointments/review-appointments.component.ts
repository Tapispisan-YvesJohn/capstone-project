import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-appointments',
  templateUrl: './review-appointments.component.html',
  styleUrls: ['./review-appointments.component.css']
})
export class ReviewAppointmentsComponent implements OnInit {

  appointments = [
    { name: 'John Doe', date: '2024-09-01', time: '10:00 AM', id: 1 },
    { name: 'Jane Smith', date: '2024-09-02', time: '11:00 AM', id: 2 },
    // Add more appointment data as needed
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewAppointment(appointment: any) {
    // Handle view appointment logic
    console.log('Viewing appointment:', appointment);
  }

  cancelAppointment(id: number) {
    // Handle cancel appointment logic
    console.log('Cancelling appointment with ID:', id);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
