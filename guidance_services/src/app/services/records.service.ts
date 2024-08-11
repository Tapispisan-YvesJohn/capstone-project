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
}
