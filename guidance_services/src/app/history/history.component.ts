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

  constructor(private recordsService: RecordsService, private router: Router) { }

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

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
