import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControlOptions } from '@angular/forms';
import { MustMatch } from './confirmed.validator';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

export interface DecodedToken {
  user_id: number;
  email: string;
  role: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;
  signupForm: FormGroup;
  isSignup = false;
  data: any;
  token: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      studentNumber: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    } as AbstractControlOptions);
  }

  toggleForm() {
    this.isSignup = !this.isSignup;
  }

  onSubmit() {
    if (this.isSignup) {
      // Signup Logic
      if (!this.signupForm.valid) {
        return;
      }
      this.authService.register(this.signupForm.value).subscribe(res => {
        this.data = res;
        if (this.data.status === 1) {
          this.showSnackBar('Signup successful', 'success');
          this.toggleForm(); // Switch to login form
        } else {
          this.showSnackBar('Failed to sign up', 'error');
        }
      });
    } else {
      // Login Logic
      if (!this.loginForm.valid) {
        return;
      }
      this.authService.login(this.loginForm.value).subscribe(res => {
        this.data = res;
        if (this.data.status === 1) {
          this.token = this.data.data.token;
          localStorage.setItem('token', this.token);
    
          // Decode the token to get the role
          const decodedToken = this.authService.decodeToken(this.token);
          const role = decodedToken.role;
    
          // Redirect based on the user's role
          if (role === 'officer') {
            this.router.navigate(['/student-record']);
          } else if (role === 'student') {
            this.router.navigate(['/student-dashboard']);
          } else {
            this.showSnackBar("Error Signing You In", 'error');
          }
          
          this.showSnackBar("Login successful", 'success');
        } else {
          this.showSnackBar("Invalid credentials", 'error');
        }
      });
    }
  }
  
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mustMatch: true };
  }  

  get emailControl() {
    return this.isSignup ? this.signupForm.get('email') : this.loginForm.get('email');
  }

  get firstNameControl() {
    return this.signupForm.get('firstName');
  }

  get lastNameControl() {
    return this.signupForm.get('lastName');
  }

  get studentNumberControl() {
    return this.signupForm.get('studentNumber');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get confirmPasswordControl() {
    return this.signupForm.get('confirmPassword');
  }

  // Method to display the snack bar notifications
  showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? ['snack-bar-success'] : ['snack-bar-error'],
    });
  }

}
