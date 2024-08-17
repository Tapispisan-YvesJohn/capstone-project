import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
