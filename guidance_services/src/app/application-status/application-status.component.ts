import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { HttpClient } from '@angular/common/http'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css']
})
export class ApplicationStatusComponent implements OnInit {
  userInfo: any = {};
  isApplicationOpen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private snackBar: MatSnackBar  
  ) { }

  ngOnInit() {
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

    this.getApplicationStatus();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getApplicationStatus() {
    this.http.get<any>('/api/get-status').subscribe(
      (response) => {
        this.isApplicationOpen = response.is_application_open;
      },
      (error) => {
        console.error('Error fetching application status:', error);
      }
    );
  }

  startApplication() {
    this.updateApplicationStatus(true); 
  }

  endApplication() {
    this.updateApplicationStatus(false); 
  }

  updateApplicationStatus(status: boolean) {
    this.http.post<any>('/api/update-status', { status: status }).subscribe(
      (response) => {
        this.isApplicationOpen = status; 
        console.log('Application status updated successfully');
      },
      (error) => {
        console.error('Error updating application status:', error);
      }
    );
  }

  toggleApplicationStatus(status: boolean) {
    this.authService.updateApplicationStatus(status).subscribe(
      (response) => {
        console.log('Application status updated:', response);
        this.snackBar.open('Application status updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        });
      },
      (error) => {
        console.error('Error updating application status:', error);
        this.snackBar.open('Error updating application status. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['snackbar-error']
        });
      }
    );
  }
}
