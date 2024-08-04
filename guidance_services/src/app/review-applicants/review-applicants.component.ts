import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-applicants',
  templateUrl: './review-applicants.component.html',
  styleUrls: ['./review-applicants.component.css']
})
export class ReviewApplicantsComponent implements OnInit {
  applicants = [
    { name: 'James, Lebron', id: '2021-00166-TG-0', course: 'BSIT' },
    { name: 'Cruz, Dela', id: '2021-00177-TG-0', course: 'BSIT' },
    { name: 'Juan, Martin', id: '2021-00196-TG-0', course: 'BSIT' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
