import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Plan } from '../domain/model/plan.entity';
import { PlanResource, PlansResponse } from './plan.resource';
import { PlanAssembler } from './plan-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class PlansApiEndpoint extends BaseApiEndpoint<Plan, PlanResource, PlansResponse, PlanAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.serverBaseUrl}${environment.plansEndpointPath}`, new PlanAssembler());
  }
}
