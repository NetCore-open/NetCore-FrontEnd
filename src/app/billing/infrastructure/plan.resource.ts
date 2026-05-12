import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { PlanType } from '../domain/model/plan.entity';

export interface PlanResource extends BaseResource {
  id: number;
  name: string;
  price: number;
  type: PlanType;
  billingPeriod: string;
  laundryFeatures: string[];
  clientFeatures: string[];
  recommended: boolean;
}

export interface PlansResponse extends BaseResponse {
  plans: PlanResource[];
}
