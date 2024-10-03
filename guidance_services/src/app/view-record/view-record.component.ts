import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecordsService } from '../services/records.service';

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.css']
})
export class ViewRecordComponent implements OnInit {
  recordForm: FormGroup;
  student: any;
  reasonLabels: string[] = [
    'Lower tuition fee', 'Safety of the place', 'Spacious Campus',
    'Nearness of home to school', 'Accessible to transportation',
    'Better quality of education', 'Adequate School Facilities',
    'Son / Daughter of PUP Employee', 'Closer Student-Faculty Relations',
    'Expecting Scholarship Offer'
  ];

  constructor(
    private fb: FormBuilder,
    private recordsService: RecordsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const printMode = this.route.snapshot.queryParamMap.get('print') === 'true';
    this.loadStudentRecord(id);

    if (printMode) {
      // Trigger print dialog after the form is populated
      window.addEventListener('load', () => {
        this.printForm();
      });
    }
  }

  loadStudentRecord(id: number): void {
    this.recordsService.getRecordById(id).subscribe({
      next: (studentData) => {
        this.student = studentData;
        this.initializeForm(this.student);
      },
      error: (error) => {
        console.error('Error fetching student data:', error);
      }
    });
  }

  printForm() {
    window.print();
  }

  initializeForm(student: any): void {
    // Check if student and all nested properties are defined before setting form controls
    this.recordForm = this.fb.group({
      lastName: [student.personal_information?.last_name || ''],
      firstName: [student.personal_information?.first_name || ''],
      middleName: [student.personal_information?.middle_name || ''],
      civilStatus: [student.personal_information?.civil_status || ''],
      religion: [student.personal_information?.religion || ''],
      email: [student.personal_information?.email || ''],
      average: [student.personal_information?.average || ''],
      course: [student.personal_information?.course || ''],
      birthDate: [student.personal_information?.birth_date || ''],
      birthPlace: [student.personal_information?.birth_place || ''],
      mobileNo: [student.personal_information?.mobile_no || ''],
      height: [student.personal_information?.height || ''],
      weight: [student.personal_information?.weight || ''],
      gender: [student.personal_information?.gender || ''],
      provincialAddress: [student.personal_information?.address || ''],
      cityAddress: [student.personal_information?.city_address || ''],
      emergencyContact: [student.personal_information?.emergency_contact || ''],
      emergencyPhone: [student.personal_information?.emergency_phone || ''],

      // Educational Background
      elementarySchool: [student.educational_background?.elementary_school || ''],
      elementaryLocation: [student.educational_background?.elementary_location || ''],
      elementaryType: [student.educational_background?.elementary_type || ''],
      elementaryYear: [student.educational_background?.elementary_year || ''],
      elementaryAwards: [student.educational_background?.elementary_awards || ''],
      juniorSchool: [student.educational_background?.junior_school || ''],
      juniorLocation: [student.educational_background?.junior_location || ''],
      juniorType: [student.educational_background?.junior_type || ''],
      juniorYear: [student.educational_background?.junior_year || ''],
      juniorAwards: [student.educational_background?.junior_awards || ''],
      seniorSchool: [student.educational_background?.senior_school || ''],
      seniorLocation: [student.educational_background?.senior_location || ''],
      seniorType: [student.educational_background?.senior_type || ''],
      seniorYear: [student.educational_background?.senior_year || ''],
      seniorAwards: [student.educational_background?.senior_awards || ''],
      otherSchool: [student.educational_background?.other_school || ''],

      // Family Background
      fatherName: [student.family_background?.father_name || ''],
      fatherAge: [student.family_background?.father_age || ''],
      fatherContact: [student.family_background?.father_contact || ''],
      fatherEducation: [student.family_background?.father_education || ''],
      fatherOccupation: [student.family_background?.father_occupation || ''],
      fatherCompany: [student.family_background?.father_company || ''],
      motherName: [student.family_background?.mother_name || ''],
      motherAge: [student.family_background?.mother_age || ''],
      motherContact: [student.family_background?.mother_contact || ''],
      motherEducation: [student.family_background?.mother_education || ''],
      motherOccupation: [student.family_background?.mother_occupation || ''],
      motherCompany: [student.family_background?.mother_company || ''],
      relationshipStatus: [student.family_background?.relationship_status || ''],
      guardianName: [student.family_background?.guardian_name || ''],
      guardianAddress: [student.family_background?.guardian_address || ''],
      monthlyIncome: [student.family_background?.monthly_income || ''],
      siblingsTotal: [student.family_background?.siblings_total || ''],
      brothers: [student.family_background?.brothers || ''],
      sisters: [student.family_background?.sisters || ''],
      employed: [student.family_background?.employed || ''],
      supportStudies: [student.family_background?.support_studies || ''],
      supportFamily: [student.family_background?.support_family || ''],
      financialSupport: [student.family_background?.financial_support || ''],
      allowance: [student.family_background?.allowance || ''],
      

      // Health Record
      vision: [student.health_record?.vision || ''],
      visionIssue: [student.health_record?.vision || ''],
      hearing: [student.health_record?.hearing || ''],
      hearingIssue: [student.health_record?.hearing || ''],
      mobility: [student.health_record?.mobility || ''],
      mobilityIssue: [student.health_record?.mobility || ''],
      speech: [student.health_record?.speech || ''],
      speechIssue: [student.health_record?.speech || ''],
      generalHealth: [student.health_record?.general_health || ''],
      generalHealthIssue: [student.health_record?.general_health || ''],
      consultedWith: [student.health_record?.consulted_with || ''],
      consultationReason: [student.health_record?.consultation_reason || ''],
      startDate: [student.health_record?.start_date || ''],
      sessions: [student.health_record?.sessions || ''],
      endDate: [student.health_record?.end_date || ''],
      
      // Test Results
      testDate: [student.test_results?.test_date || ''],
      testAdministered: [student.test_results?.test_administered || ''],
      rs: [student.test_results?.rs || ''],
      pr: [student.test_results?.pr || ''],
      description: [student.test_results?.test_description || ''],

      // Significant Notes
      noteDate: [student.significant_notes?.date || ''],
      incident: [student.significant_notes?.incident || ''],
      remarks: [student.significant_notes?.remarks || ''],

      // Checkbox for Reasons of Enrollment
      reasons: this.fb.array(
        this.reasonLabels.map((_, i) => student.reasons?.[i] || false)
      ),
      otherReasons: [student.other_reasons || '']
    });
  }

}
