import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Plan } from '../domain/model/plan.entity';
import { PlanResource, PlansResponse } from './plan.resource';

export class PlanAssembler implements BaseAssembler<Plan, PlanResource, PlansResponse> {
  toEntitiesFromResponse(response: PlansResponse): Plan[] {
    return response.plans.map(r => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: PlanResource): Plan {
    return new Plan(resource.id, resource.name, resource.price, resource.type,
      resource.billingPeriod, resource.laundryFeatures, resource.clientFeatures, resource.recommended);
  }

  toResourceFromEntity(entity: Plan): PlanResource {
    return { id: entity.id, name: entity.name, price: entity.price, type: entity.type,
      billingPeriod: entity.billingPeriod, laundryFeatures: entity.laundryFeatures,
      clientFeatures: entity.clientFeatures, recommended: entity.recommended };
  }
}
