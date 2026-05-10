import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BillingApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  getPlans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/plans`);
  }

  getSubscriptionsByLaundry(laundryId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/subscriptions?laundryId=${laundryId}`
    );
  }

  createSubscription(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/subscriptions`, data);
  }

  getTransactionsBySubscription(subscriptionId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/transactions?subscriptionId=${subscriptionId}`
    );
  }

  createTransaction(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/transactions`, data);
  }
}
