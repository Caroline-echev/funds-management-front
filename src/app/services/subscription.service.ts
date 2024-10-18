import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl = `${environment.apiUrl}/subscriptions`; 

  constructor(private http: HttpClient) { }

  subscribe(userId: string, fundId: string, isSMS: boolean, amount: number): Observable<void> {
    const requestBody = {
      userId,
      fundId,
      isSMS,
      amount
    };
    
    return this.http.post<void>(`${this.apiUrl}/subscribe`, requestBody, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  unsubscribe(userId: string, fundId: string, isSMS: boolean): Observable<void> {
    const requestBody = {
      userId,
      fundId,
      isSMS
    };
    
    return this.http.post<void>(`${this.apiUrl}/unsubscribe`, requestBody, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
