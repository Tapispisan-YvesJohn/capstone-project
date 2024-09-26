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

  // Define the list of courses for the dropdown
  courses: string[] = ['All Courses', 'BS Computer Science', 'BS Information Technology', 'BS Business Administration'];

  constructor(private router: Router, private reportService: ReportService) { }

  ngOnInit(): void {
    this.loadReports();
  }

  // Method to load report data from the backend service
  loadReports(): void {
    this.reportService.getReports().subscribe(data => {
      this.reports = data;  // Assume data comes from API
      this.totalRecords = this.reports.length; // Set total records for pagination
      this.filteredReports = this.reports.slice(0, this.rows); // Load initial set
    }, error => {
      console.error('Error fetching reports', error);
    });
  }

  // Method to apply filters
  applyFilters(): void {
    this.filteredReports = this.reports.filter(report => {
      return (this.selectedCourse === 'All Courses' || report.course === this.selectedCourse) &&
             (!this.filterName || report.name.toLowerCase().includes(this.filterName.toLowerCase())) &&
             (!this.filterDate || report.date === this.filterDate);
    });
    this.totalRecords = this.filteredReports.length;
    this.filteredReports = this.filteredReports.slice(0, this.rows); // Reset pagination to first page
  }

  // Method to handle pagination
  paginate(event: any) {
    const start = event.first;
    const end = event.first + event.rows;
    this.filteredReports = this.reports.slice(start, end);  // Paginated records
  }

  // Method to handle report export to CSV
  exportToCSV(): void {
    const csvData = this.convertToCSV(this.reports);
    const blob = new Blob([csvData], { type: 'text/csv' });
    saveAs(blob, 'reports.csv');
  }

  // Convert data to CSV
  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]);
    const csvRows = data.map(report => header.map(field => `"${report[field]}"`).join(','));
    return [header.join(','), ...csvRows].join('\n');
  }

  // Method to handle report export to Excel
  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.reports);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'reports.xlsx');
  }

  // Method to handle report export to PDF
  exportToPDF(): void {
    const doc = new jsPDF();
    const columns = ['ID', 'Title', 'Date'];
    const rows = this.reports.map(report => [report.id, report.title, report.date]);

    autoTable(doc, {
      head: [columns],
      body: rows,
    });

    doc.save('reports.pdf');
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
