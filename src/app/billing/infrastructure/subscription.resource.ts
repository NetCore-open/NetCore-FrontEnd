import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { SubscriptionStatus } from '../domain/model/subscription.entity';

export interface SubscriptionResource extends BaseResource {
  id: number;
  planId: number;
  laundryId: number;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
}

export interface SubscriptionsResponse extends BaseResponse {
  subscriptions: SubscriptionResource[];
}
