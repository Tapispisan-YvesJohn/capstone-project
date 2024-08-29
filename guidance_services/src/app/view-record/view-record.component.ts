import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordsService } from '../services/records.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.css']
})
export class ViewRecordComponent implements OnInit {
  student: any;
  editMode: boolean = false;
  recordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recordsService: RecordsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.route.queryParams.subscribe(params => {
      this.editMode = params['edit'] === 'true';
    });

    this.loadStudentRecord(id);
  }

  loadStudentRecord(id: number): void {
    this.recordsService.getRecordById(id).subscribe({
      next: (record) => {
        this.student = record;
        this.initializeForm();
      },
      error: (error) => {
        console.error('Error fetching student record', error);
      }
    });
  }

  initializeForm(): void {
    this.recordForm = this.fb.group({
      // Personal Information
      lastName: [this.student.personal_information.last_name, [Validators.required, Validators.minLength(2)]],
      firstName: [this.student.personal_information.first_name, [Validators.required, Validators.minLength(2)]],
      middleName: [this.student.personal_information.middle_name, Validators.required],
      civilStatus: [this.student.personal_information.civil_status, Validators.required],
      religion: [this.student.personal_information.religion, Validators.required],
      email: [this.student.personal_information.email, [Validators.required, Validators.email]],
      course: [this.student.personal_information.course, Validators.required],
      dob: [this.student.personal_information.dob, Validators.required],
      placeOfBirth: [this.student.personal_information.place_of_birth, Validators.required],
      mobileNo: [this.student.personal_information.mobile_no, [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      address: [this.student.personal_information.address, Validators.required],
      emergencyContact: [this.student.personal_information.emergency_contact, Validators.required],
      
      // Educational Background
      elementarySchool: [this.student.educational_background.elementary_school, Validators.required],
      juniorHighSchool: [this.student.educational_background.junior_high_school, Validators.required],
      seniorHighSchool: [this.student.educational_background.senior_high_school, Validators.required],
      
      // Family Background
      fatherName: [this.student.family_background.father_name, Validators.required],
      fatherAge: [this.student.family_background.father_age, [Validators.required, Validators.min(18), Validators.max(120)]],
      fatherOccupation: [this.student.family_background.father_occupation, Validators.required],
      motherName: [this.student.family_background.mother_name, Validators.required],
      motherAge: [this.student.family_background.mother_age, [Validators.required, Validators.min(18), Validators.max(120)]],
      motherOccupation: [this.student.family_background.mother_occupation, Validators.required],

      // Health Record
      vision: [this.student.health_record.vision, Validators.required],
      hearing: [this.student.health_record.hearing, Validators.required],
      generalHealth: [this.student.health_record.general_health, Validators.required],

      // Test Results
      testDate: [this.student.test_results.test_date, Validators.required],
      testAdministered: [this.student.test_results.test_administered, Validators.required],
      testResults: [this.student.test_results.test_results, Validators.required],
      testDescription: [this.student.test_results.test_description, Validators.required],

      // Significant Notes
      incidentDate: [this.student.significant_notes.date, Validators.required],
      incident: [this.student.significant_notes.incident, Validators.required],
      remarks: [this.student.significant_notes.remarks, Validators.required],
    });
  }

  saveChanges(): void {
    if (this.recordForm.valid) {
      const updatedData = this.recordForm.value;
      this.recordsService.updateRecord(this.student.id, updatedData).subscribe({
        next: () => {
          this.loadStudentRecord(this.student.id); // Reload the student record after saving changes
          this.editMode = false; // Exit edit mode
          console.log('Record updated successfully');
        },
        error: (error) => {
          console.error('Error updating record', error);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
}
