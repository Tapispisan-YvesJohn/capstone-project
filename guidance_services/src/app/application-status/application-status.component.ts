import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css']
})
export class ApplicationStatusComponent implements OnInit {
  userInfo: any = {};

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
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

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
