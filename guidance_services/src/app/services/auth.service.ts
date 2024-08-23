import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post( 'http://127.0.0.1:8000/api/login', data);
  }

  decodeToken(token: string) {
    return jwtDecode<DecodedToken>(token);
  }

}
