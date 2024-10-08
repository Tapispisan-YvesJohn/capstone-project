import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsService } from '../services/records.service'; // Adjust the path as needed

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  students: any[] = []; // Initialize an empty array to store student records

  constructor(private router: Router, private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.fetchStudentRecords(); // Fetch records when the component is initialized
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
              course: personalInfo.course,
            };
          } else {
            return {
              id: record.id,
              name: 'Unknown', 
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
