
import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'EXPIRED';

export class Subscription implements BaseEntity {
  constructor(
    public readonly id: number,
    public readonly planId: number,
    public readonly laundryId: number,
    public readonly status: SubscriptionStatus,
    public readonly startDate: string,
    public readonly endDate: string
  ) {}
}
