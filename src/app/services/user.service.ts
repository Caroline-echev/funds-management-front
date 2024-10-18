import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../interfaces/user';



export interface SubscriptionResponse {
  // Define la estructura de SubscriptionResponse según tu backend
  id: string;
  plan: string;
  startDate: string;
  endDate: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user'; // Cambia esta URL tu configuración
 
  constructor(private http: HttpClient) { }

  // Obtener usuario por ID
  getUser(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${userId}`);
  }

  // Obtener suscripciones por ID de usuario
  getSubscriptionsByUserId(userId: string): Observable<SubscriptionResponse[]> {
    let params = new HttpParams().set('userId', userId);
    return this.http.get<SubscriptionResponse[]>(`${this.apiUrl}/subscriptions`, { params });
  }

  // Obtener transacciones por ID de usuario
  getTransactionsByUserId(userId: string): Observable<SubscriptionResponse[]> {
    let params = new HttpParams().set('userId', userId);
    return this.http.get<SubscriptionResponse[]>(`${this.apiUrl}/transactions`, { params });
  }
}
