import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = 'http://127.0.0.1:8000/api/appointments';

  constructor(private http: HttpClient) {}

  scheduleAppointment(appointmentData: any): Observable<any> {
    return this.http.post(this.apiUrl, appointmentData);
  }
}
