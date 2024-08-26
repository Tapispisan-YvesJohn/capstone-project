import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  data: any;
  token: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
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
          this.router.navigate(['/homepage']);
        } else if (role === 'student') {
          this.router.navigate(['/student-dashboard']);
        } else {
          console.log("Error Signing You In");
        }
        
        console.log("Log in Success");
      } else {
        console.log("Failed to log in");
      }
    });
  }
  

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}
