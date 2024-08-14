import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post( 'http://127.0.0.1:8000/api/login', data);
  }

}
