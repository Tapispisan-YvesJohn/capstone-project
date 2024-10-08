import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://127.0.0.1:8000/api/reports'; // Adjust based on actual API

  constructor(private http: HttpClient) { }

  // Fetch reports (adjusted to fetch Name, Course, Email data)
  getReports(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);  // Adjust if your API requires additional parameters
  }
}
