import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-review-applicants',
  templateUrl: './review-applicants.component.html',
  styleUrls: ['./review-applicants.component.css']
})
export class ReviewApplicantsComponent implements OnInit {
  userInfo: any = {};
  applicants = [
    { name: 'James, Lebron', id: '2021-00166-TG-0', course: 'BSIT' },
    { name: 'Cruz, Dela', id: '2021-00177-TG-0', course: 'BSIT' },
    { name: 'Juan, Martin', id: '2021-00196-TG-0', course: 'BSIT' }
  ];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void { 
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
