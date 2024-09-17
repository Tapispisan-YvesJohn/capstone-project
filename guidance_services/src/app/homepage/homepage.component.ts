import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsService } from '../services/records.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  students: any[] = [];
  userInfo: any = {};
  filteredStudents: any[] = [];
  selectedCourse: string = '';
  courses: string[] = [
    'BSECE', 'BSME', 'BSA', 'BSBA', 'BSAM', 'BSIT', 'BSENTREP', 'BSED - Mathematics', 'BSED - English',
    'BSPSYCH', 'BSOA', 'DICT', 'DOMT'
  ];

  constructor(private router: Router, private recordsService: RecordsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fetchStudentRecords();

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

  fetchStudentRecords(): void {
    this.recordsService.getRecords().subscribe({
      next: (records) => {
        this.students = records.map((record: any) => {
          const personalInfo = record.personal_information;

          if (personalInfo) {
            const middleInitial = personalInfo.middle_name ? `${personalInfo.middle_name.charAt(0)}.` : '';
            const formattedName = `${personalInfo.last_name}, ${personalInfo.first_name} ${middleInitial}`;

            return {
              id: record.id,
              name: formattedName,
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

        // Sort the students alphabetically by their last name
        this.students.sort((a, b) => {
          const lastNameA = a.name.split(',')[0].toLowerCase();
          const lastNameB = b.name.split(',')[0].toLowerCase();
          return lastNameA.localeCompare(lastNameB);
        });

        // Initially display all students
        this.filteredStudents = [...this.students];
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
          this.filteredStudents = this.filteredStudents.filter(student => student.id !== id);
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

  filterByCourse(): void {
    if (this.selectedCourse) {
      this.filteredStudents = this.students.filter(student => student.course === this.selectedCourse);
    } else {
      this.filteredStudents = [...this.students]; // If no course selected, show all students
    }
  }
}
