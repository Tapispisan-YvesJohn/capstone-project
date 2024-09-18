import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reports: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadReports();
  }

  // Method to load report data
  loadReports(): void {
    // Placeholder for fetching report data logic
    // Replace this with actual service call or logic for fetching reports
    this.reports = [
      { id: 1, title: 'Report 1', date: '2024-09-18' },
      { id: 2, title: 'Report 2', date: '2024-09-19' }
    ];
  }

  // Method to handle report export or printing
  exportReport(reportId: number): void {
    console.log(`Exporting report with ID: ${reportId}`);
    // Add logic for exporting/printing the report
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
