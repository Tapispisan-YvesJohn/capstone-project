import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions, 
  ValidatorFn, AbstractControl, FormControl,
  ValidationErrors} from '@angular/forms';
import { CreateRecordService } from '../services/createrecord.service';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent {
  createRecordForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private createRecordService: CreateRecordService,

  ) {
    this.createRecordForm = this.fb.group({
      first_name: ['', {
        validators: [Validators.required, this.noNumbersValidator]
      }],
      last_name: ['', {
        validators: [Validators.required, this.noNumbersValidator]
      }],
      middle_name: ['', {
        validators: [Validators.required, this.noNumbersValidator]
      }],
      age: ['', [Validators.required, Validators.min(18)]],
      height: ['', {
        validators: [Validators.required]
      }],
      weight: ['', {
        validators: [Validators.required]
      }],
      gender: ['', {
        validators: [Validators.required]
      }],
      hs_average: ['', {
        validators: [Validators.required]
      }],
      civil_status: ['', {
        validators: [Validators.required]
      }],
      religion: ['', {
        validators: [Validators.required]
      }],
      course: ['', {
        validators: [Validators.required]
      }],
      year_section: ['', {
        validators: [Validators.required]
      }],
      telephone: ['', {
        validators: [Validators.required]
      }],
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      birthday: ['', {
        validators: [
          Validators.required, 
          this.minAgeValidator(18), 
          this.maxAgeValidator(80)]
      }],
      place_of_birth: ['', {
        validators: [Validators.required]
      }],
      residential_address: ['', {
        validators: [Validators.required]
      }],
      provincial_address: ['', {
        validators: [Validators.required]
      }],
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  onSubmit(): void {
    if (this.createRecordForm.valid) {
      this.createRecordService.createStudentRecord(this.createRecordForm.value)
        .subscribe({
          next: (response) => {
            console.log('Record created successfully', response);
          },
          error: (error) => {
            console.error('Error creating record', error);
          }
        });
    } else {
      console.log('Form is invalid');
    }
  }

  get firstNameControl() {
    return this.createRecordForm.get('first_name');
  }
  
  get lastNameControl() {
    return this.createRecordForm.get('last_name');
  }

  get middleNameControl(){
    return this.createRecordForm.get('middle_name');
  }

  get bdayControl() {
    return this.createRecordForm.get('birthday'); 
  }

  get genderControl() {
    return this.createRecordForm.get('gender');
  }

  get ageControl() {
    return this.createRecordForm.get('age');
  }

  get heightControl(){
    return this.createRecordForm.get('height');
  }

  get weightControl() {
    return this.createRecordForm.get('weight'); 
  }

  get hsAverageControl() {
    return this.createRecordForm.get('hs_average');
  }

  get civilStatusControl() {
    return this.createRecordForm.get('civil_status');
  }

  get religionControl(){
    return this.createRecordForm.get('religion');
  }

  get courseControl() {
    return this.createRecordForm.get('course'); 
  }

  get yearSectionControl() {
    return this.createRecordForm.get('year_section');
  }

  get telephoneControl() {
    return this.createRecordForm.get('telephone');
  }

  get emailControl(){
    return this.createRecordForm.get('email');
  }

  get placeOfBirthControl() {
    return this.createRecordForm.get('place_of_birth'); 
  }

  get redidentialAddressControl() {
    return this.createRecordForm.get('residential_address');
  }

  get provincialAddressControl() {
    return this.createRecordForm.get('provincial_address');
  }

  noNumbersValidator(control: FormControl) {
    const containsNumbers = /[0-9]/.test(control.value);
    return containsNumbers ? { containsNumbers: true } : null;
  }

  maxAgeValidator(maxAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const today = new Date();
        const birthDate = new Date(control.value);
        const age = today.getFullYear() - birthDate.getFullYear();

        if (age > maxAge) {
          return { 'maxAge': { value: age } };
        }
      }
      return null;
    };
  }

  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const today = new Date();
        const birthDate = new Date(control.value);
        const age = today.getFullYear() - birthDate.getFullYear();

        if (age < minAge) {
          return { 'minAge': { value: age } };
        }
      }
      return null;
    };
  }

}
