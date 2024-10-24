import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { AuthService } from '../services/auth.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  filters: any = {
    name: '',
    date: ''
  };
  selectedCourse = ''; 
  rows: any[] = [];
  courses: string[] = ['All Courses', 'BSIT', 'BSBA', 'BSHM']; 

  constructor(private reportService: ReportService, private authService: AuthService) {}

  ngOnInit() {
    this.applyFilters(); 
  }

  applyFilters() {
    console.log('Selected Course:', this.selectedCourse);
    console.log('Filters:', this.filters);

    this.reportService.getReports(this.selectedCourse, this.filters).subscribe(
      (data: any) => {
        this.rows = data;
        console.log('Filtered Data:', data); 
      },
      (error: any) => {
        console.error('Error fetching filtered reports:', error);
      }
    );
  }

  
  exportToCSV() {
    const csvData = this.convertToCSV(this.rows);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'reports.csv');
  }

 
  convertToCSV(objArray: any[]): string {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = 'First Name,Last Name,Course,Email\n';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line !== '') line += ',';
        line += array[i][index];
      }
      str += line + '\n';
    }
    return str;
  }

 
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rows);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'reports');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, `${fileName}.xlsx`);
  }

 
  exportToPDF() {
    const doc = new jsPDF();
    const columns = ['First Name', 'Last Name', 'Course', 'Email'];
    const rows = this.rows.map(report => [
      report.first_name,
      report.last_name,
      report.course,
      report.email
    ]);

    doc.text('Report List', 14, 16);
    (doc as any).autoTable({
      head: [columns],
      body: rows,
    });
    doc.save('reports.pdf');
  }

  paginateReports(event) {
    console.log('Pagination event:', event);
  }

  logout(): void {
    this.authService.logout();  
  }
}
