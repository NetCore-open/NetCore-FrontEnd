import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { PlansApiEndpoint } from './plans-api-endpoint';
import { SubscriptionsApiEndpoint } from './subscriptions-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../domain/model/plan.entity';
import { Subscription } from '../domain/model/subscription.entity';
import { CreateSubscriptionCommand } from '../domain/model/create-subscription.command';

@Injectable({ providedIn: 'root' })
export class BillingApi extends BaseApi {
  private readonly plansEndpoint: PlansApiEndpoint;
  private readonly subscriptionsEndpoint: SubscriptionsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.plansEndpoint = new PlansApiEndpoint(http);
    this.subscriptionsEndpoint = new SubscriptionsApiEndpoint(http);
  }

  getPlans(): Observable<Plan[]> { return this.plansEndpoint.getAll(); }
  getSubscriptionsByLaundry(laundryId: number): Observable<Subscription[]> { return this.subscriptionsEndpoint.getByLaundry(laundryId); }
  createSubscription(command: CreateSubscriptionCommand): Observable<Subscription> { return this.subscriptionsEndpoint.createFromCommand(command); }
}
