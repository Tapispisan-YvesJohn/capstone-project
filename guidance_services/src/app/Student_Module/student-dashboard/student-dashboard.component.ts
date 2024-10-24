import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  
  logout(): void {
    this.authService.logout();  
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
