import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Subscription } from '../domain/model/subscription.entity';
import { SubscriptionResource, SubscriptionsResponse } from './subscription.resource';
import { SubscriptionAssembler } from './subscription-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map, catchError } from 'rxjs';
import { CreateSubscriptionCommand } from '../domain/model/create-subscription.command';

export class SubscriptionsApiEndpoint extends BaseApiEndpoint<Subscription, SubscriptionResource, SubscriptionsResponse, SubscriptionAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.serverBaseUrl}${environment.subscriptionsEndpointPath}`, new SubscriptionAssembler());
  }

  getByLaundry(laundryId: number): Observable<Subscription[]> {
    return this.http.get<SubscriptionResource[]>(`${this.endpointUrl}?laundryId=${laundryId}`).pipe(
      map(items => items.map(i => this.assembler.toEntityFromResource(i))),
      catchError(this.handleError('Failed to fetch subscriptions'))
    );
  }

  createFromCommand(command: CreateSubscriptionCommand): Observable<Subscription> {
    const body: SubscriptionResource = {
      id: 0, planId: command.planId, laundryId: command.laundryId,
      status: 'ACTIVE',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    return this.http.post<SubscriptionResource>(this.endpointUrl, body).pipe(
      map(r => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to create subscription'))
    );
  }
}
