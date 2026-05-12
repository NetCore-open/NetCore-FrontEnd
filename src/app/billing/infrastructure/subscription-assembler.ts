import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Subscription } from '../domain/model/subscription.entity';
import { SubscriptionResource, SubscriptionsResponse } from './subscription.resource';

export class SubscriptionAssembler implements BaseAssembler<Subscription, SubscriptionResource, SubscriptionsResponse> {
  toEntitiesFromResponse(response: SubscriptionsResponse): Subscription[] {
    return response.subscriptions.map(r => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: SubscriptionResource): Subscription {
    return new Subscription(resource.id, resource.planId, resource.laundryId,
      resource.status, resource.startDate, resource.endDate);
  }

  toResourceFromEntity(entity: Subscription): SubscriptionResource {
    return { id: entity.id, planId: entity.planId, laundryId: entity.laundryId,
      status: entity.status, startDate: entity.startDate, endDate: entity.endDate };
  }
}
