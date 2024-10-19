// src/app/services/fund.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FundResponse } from '../interfaces/fund';

@Injectable({
  providedIn: 'root'
})
export class FundService {
  private apiUrl = 'http://localhost:8090/api/v1/funds/'; 

  constructor(private http: HttpClient) { }

  getFunds(category?: string, orderByName: boolean = true, isAsc: boolean = true): Observable<FundResponse[]> {
    let params = new HttpParams()
      .set('orderByName', orderByName.toString())
      .set('isAsc', isAsc.toString());

    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<FundResponse[]>(this.apiUrl, { params });
  }
}
