import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = 'http://localhost:8000/api/reports'; 

  constructor(private httpClient: HttpClient) {} 

  getReports(course: string, filters: any): Observable<any[]> {
    let params = new HttpParams()
      .set('course', course || '')
      .set('name', filters.name || '')
      .set('date', filters.date || '');

    return this.httpClient.get<any[]>(this.apiUrl, { params }); 
  }
}
