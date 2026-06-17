import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { PlansApiEndpoint } from './plans-api-endpoint';
import { SubscriptionsApiEndpoint } from './subscriptions-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../domain/model/plan.entity';
import { Subscription } from '../domain/model/subscription.entity';
import { CreateSubscriptionCommand } from '../domain/model/create-subscription.command';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BillingApi extends BaseApi {
  private readonly plansEndpoint: PlansApiEndpoint;
  private readonly subscriptionsEndpoint: SubscriptionsApiEndpoint;

  constructor(private http: HttpClient) {
    super();
    this.plansEndpoint = new PlansApiEndpoint(http);
    this.subscriptionsEndpoint = new SubscriptionsApiEndpoint(http);
  }

  getPlans(): Observable<Plan[]> { return this.plansEndpoint.getAll(); }
  getSubscriptionsByLaundry(laundryId: number): Observable<Subscription[]> { return this.subscriptionsEndpoint.getByLaundry(laundryId); }
  createSubscription(command: CreateSubscriptionCommand): Observable<Subscription> { return this.subscriptionsEndpoint.createFromCommand(command); }
  cancelSubscription(id: number): Observable<any> { return this.subscriptionsEndpoint.cancel(id); }
  createTransaction(data: any): Observable<any> {
    return this.http.post<any>(`${environment.serverBaseUrl}${environment.transactionsEndpointPath}`, data);
  }
}
