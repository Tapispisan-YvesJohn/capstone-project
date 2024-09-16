import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsService } from '../services/records.service'; 

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  students: any[] = [];

  constructor(private router: Router, private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.fetchStudentRecords();
  }

  fetchStudentRecords(): void {
    this.recordsService.getRecords().subscribe({
      next: (records) => {
        this.students = records.map((record: any) => {
          const personalInfo = record.personal_information;

          if (personalInfo) {
            return {
              id: record.id,
              name: `${personalInfo.first_name} ${personalInfo.last_name}`,
              email: personalInfo.email,
              course: personalInfo.course,
            };
          } else {
            return {
              id: record.id,
              name: 'Unknown',
              email: 'Unknown',
              course: 'Unknown',
            };
          }
        });
      },
      error: (error) => {
        console.error('Error fetching records', error);
      }
    });
  }

  deleteRecord(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.recordsService.deleteRecord(id).subscribe({
        next: () => {
          this.students = this.students.filter(student => student.id !== id);
          console.log('Record deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting record', error);
        }
      });
    }
  }

  viewRecord(student: any): void {
    this.router.navigate(['/view-record', student.id]);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
