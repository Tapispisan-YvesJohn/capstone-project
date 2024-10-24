// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { jwtDecode } from 'jwt-decode';
// import { DecodedToken } from '../login/login.component';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   // private apiUrl = 'http://127.0.0.1:8000/api/login';

//   constructor(private http: HttpClient) { }

//   login(data) {
//     return this.http.post( 'http://127.0.0.1:8000/api/login', data);
//   }

//   decodeToken(token: string) {
//     return jwtDecode<DecodedToken>(token);
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../login/login.component';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private userInfo = {
    email: '',
    id: 0
  };

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  login(data) {
    return this.http.post('http://127.0.0.1:8000/api/login', data);
  }

  setAuthStatus(status: boolean) {
    this.isAuthenticated = status;
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decodedToken: any = this.decodeToken(token);
    if (!decodedToken) return true;
    const exp = decodedToken.exp;
    return Date.now() >= exp * 1000;
  }

  getUserInfo(token: string): Observable<any> {
    const decodedToken: any = this.decodeToken(token);
    if (!decodedToken || this.isTokenExpired(token)) {
      this.setAuthStatus(false);
      return throwError('Token expired or invalid');
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const userId = decodedToken.user_id;
    const email = decodedToken.email;

    return this.http.get(`http://127.0.0.1:8000/api/retrieve/${userId}&${email}`, { headers })
      .pipe(
        map((data: any) => {
          this.userInfo = {
            email: data.email,
            id: data.user_id,
            ...data
          };
          this.setAuthStatus(true);
          return this.userInfo;
        }),
        catchError(error => {
          console.error('Error fetching user info:', error);
          this.setAuthStatus(false);
          return throwError(error);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  register(user: any) {
    return this.http.post('http://127.0.0.1:8000/api/register', user);
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove the token from local storage
    this.router.navigate(['/login']);  // Redirect to login page
  }
  
}
