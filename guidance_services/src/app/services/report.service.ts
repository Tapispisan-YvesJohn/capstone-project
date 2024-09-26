import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://127.0.0.1:8000/api/reports'; // Adjust based on actual API

  constructor(private http: HttpClient) { }

  // Fetch reports from backend API
  getReports(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Import reports via batch upload
  importReports(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/import`, formData);
  }
}
