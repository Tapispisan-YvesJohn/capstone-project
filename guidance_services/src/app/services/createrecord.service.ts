import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateRecordService {
  private apiUrl = 'http://127.0.0.1:8000/api/student-records';

  constructor(private http: HttpClient) {}

  createStudentRecord(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}

