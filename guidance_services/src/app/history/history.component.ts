import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsService } from '../services/records.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  students: any[] = [];
  userInfo: any = {};

  constructor(private recordsService: RecordsService, private router: Router, 
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.fetchDeletedRecords(); // Fetch deleted records when the component is initialized
    
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

  fetchDeletedRecords(): void {
    this.recordsService.getDeletedRecords().subscribe({
      next: (records) => {
        this.students = records.map((record: any) => {
          const personalInfo = JSON.parse(record.personal_information);
          
          // Format the name as Last Name, First Name M.I.
          const middleInitial = personalInfo.middle_name ? ` ${personalInfo.middle_name.charAt(0)}.` : '';
          const formattedName = `${personalInfo.last_name}, ${personalInfo.first_name}${middleInitial}`;
          
          return {
            id: record.student_record_id,
            name: formattedName,
            course: personalInfo.course,
            email: personalInfo.email
          };
        });
      },
      error: (error) => {
        console.error('Error fetching deleted records', error);
      }
    });
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
