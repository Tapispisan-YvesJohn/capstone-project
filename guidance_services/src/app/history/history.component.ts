import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsService } from '../services/records.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  students: any[] = [];

  constructor(private recordsService: RecordsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDeletedRecords(); // Fetch deleted records when the component is initialized
  }

  fetchDeletedRecords(): void {
    this.recordsService.getDeletedRecords().subscribe({
      next: (records) => {
        this.students = records.map((record: any) => {
          const personalInfo = JSON.parse(record.personal_information);
          return {
            id: record.student_record_id,
            name: `${personalInfo.first_name} ${personalInfo.last_name}`,
            course: personalInfo.course,
          };
        });
      },
      error: (error) => {
        console.error('Error fetching deleted records', error);
      }
    });
  }

  viewRecord(student: any): void {
    this.router.navigate(['/view-record', student.id]);
  }

  retrieveRecord(id: number): void {
    if (confirm('Are you sure you want to retrieve this record?')) {
      this.recordsService.retrieveRecord(id).subscribe({
        next: () => {
          this.students = this.students.filter(student => student.id !== id);
          alert('Record retrieved successfully');
        },
        error: (error) => {
          console.error('Error retrieving record', error);
        }
      });
    }
  }

  deletePermanently(id: number): void {
    if (confirm('Are you sure you want to permanently delete this record? This action cannot be undone.')) {
      this.recordsService.deletePermanently(id).subscribe({
        next: () => {
          this.students = this.students.filter(student => student.id !== id);
          alert('Record permanently deleted');
        },
        error: (error) => {
          console.error('Error deleting record', error);
        }
      });
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
