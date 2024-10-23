import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsService } from '../services/records.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private router: Router,
    private recordsService: RecordsService,
    private authService: AuthService,
    private snackBar: MatSnackBar // Inject MatSnackBar
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
    // Show Snackbar with Delete/Cancel options
    const snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this.snackBar.open('Do you want to delete this record?', 'Delete', {
      duration: 5000, // 5 seconds
      panelClass: ['snackbar-warning']
    });

    // Handle action based on the Snackbar response
    snackBarRef.onAction().subscribe(() => {
      this.recordsService.deleteRecord(id).subscribe({
        next: () => {
          this.students = this.students.filter(student => student.id !== id);
          this.filteredStudents = this.filteredStudents.filter(student => student.id !== id);
          this.snackBar.open('Record deleted successfully', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        },
        error: (error) => {
          console.error('Error deleting record', error);
          this.snackBar.open('Error deleting record', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    });
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

  printForm(student: any) {
    const url = `/view-record/${student.id}?print=true`;
    window.open(url, '_blank');  
  }
}
