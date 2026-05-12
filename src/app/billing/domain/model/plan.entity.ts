import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type PlanType = 'FREE' | 'PREMIUM' | 'ANNUAL';

export class Plan implements BaseEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
    public readonly type: PlanType,
    public readonly billingPeriod: string,
    public readonly laundryFeatures: string[],
    public readonly clientFeatures: string[],
    public readonly recommended: boolean
  ) {}
}
