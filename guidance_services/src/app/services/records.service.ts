import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private apiUrl = 'http://127.0.0.1:8000/api/records';

  constructor(private http: HttpClient) { }

  createRecord(recordData: any): Observable<any> {
    return this.http.post(this.apiUrl, recordData);
  }

  getRecords(): Observable<any> {
  return this.http.get(this.apiUrl);
  }

  deleteRecord(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getRecordById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getDeletedRecords(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/deleted-records');
  }
}
