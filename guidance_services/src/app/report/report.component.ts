import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../services/report.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';  // For Excel export
import jsPDF from 'jspdf';  // For PDF export
import autoTable from 'jspdf-autotable'; // For table in PDF

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reports: any[] = [];
  filteredReports: any[] = [];
  rows: number = 10;  // Number of rows per page
  totalRecords: number = 0;  // Total number of records for pagination

  selectedCourse: string = 'All Courses';
  filterName: string = '';
  filterDate: string = '';

  courses: string[] = []; // Adjust based on dynamic fetching from backend

  constructor(private router: Router, private reportService: ReportService) { }

  ngOnInit(): void {
    this.loadReports();
    this.loadCourses();
  }

  // Load reports from backend API
  loadReports(): void {
    this.reportService.getReports().subscribe(data => {
      this.reports = data;
      this.totalRecords = this.reports.length;
      this.filteredReports = this.reports.slice(0, this.rows);
    }, error => {
      console.error('Error fetching reports', error);
    });
  }

  // Load courses dynamically (or adjust for static)
  loadCourses(): void {
    // Example hardcoded, replace with backend fetching logic if necessary
    this.courses = ['All Courses', 'BSIT', 'BSBA', 'BSME', 'BSCS', 'BSIS', 'BSEE'];
  }

  applyFilters(): void {
    console.log("Original Reports:", this.reports);
  
    // Apply filters based on the values filled in. If a field is blank, don't filter by that field.
    this.filteredReports = this.reports.filter(report => {
      console.log("Checking Report:", report);  // Print full report object
      
      const nameMatch = !this.filterName || (report.name && report.name.toLowerCase().includes(this.filterName.toLowerCase().trim()));
      const courseMatch = this.selectedCourse === 'All Courses' || (report.course && report.course.toLowerCase() === this.selectedCourse.toLowerCase());
      const dateMatch = !this.filterDate || report.date === this.filterDate;
  
      return nameMatch && courseMatch && dateMatch;
    });
  
    console.log("Filtered Reports:", this.filteredReports);
    
    this.totalRecords = this.filteredReports.length;
    this.filteredReports = this.filteredReports.slice(0, this.rows);
  }

  // Handle pagination logic
  paginate(event: any) {
    const start = event.first;
    const end = event.first + event.rows;
    this.filteredReports = this.reports.slice(start, end);
  }

  // Navigation function
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  // Export reports to CSV
  exportToCSV(): void {
    const csvData = this.convertToCSV(this.reports);
    const blob = new Blob([csvData], { type: 'text/csv' });
    saveAs(blob, 'reports.csv');
  }

  // Helper function to convert to CSV format
  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]);
    const csvRows = data.map(report => header.map(field => `"${report[field]}"`).join(','));
    return [header.join(','), ...csvRows].join('\n');
  }

  // Export reports to Excel
  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.reports);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'reports.xlsx');
  }

  // Export reports to PDF
  exportToPDF(): void {
    const doc = new jsPDF();
    const columns = ['ID', 'Name', 'Course', 'Date']; // Modify columns based on your data
    const rows = this.reports.map(report => [report.id, report.name, report.course, report.date]);

    autoTable(doc, {
      head: [columns],
      body: rows,
    });

    doc.save('reports.pdf');
  }
}
