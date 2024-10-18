import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubscriptionResponse, UserResponse } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user'; 
 
  constructor(private http: HttpClient) { }


  getUser(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${userId}`);
  }

  getSubscriptionsByUserId(userId: string): Observable<SubscriptionResponse[]> {
    let params = new HttpParams().set('userId', userId);
    return this.http.get<SubscriptionResponse[]>(`${this.apiUrl}/subscriptions`, { params });
  }

  getTransactionsByUserId(userId: string): Observable<SubscriptionResponse[]> {
    let params = new HttpParams().set('userId', userId);
    return this.http.get<SubscriptionResponse[]>(`${this.apiUrl}/transactions`, { params });
  }
}
