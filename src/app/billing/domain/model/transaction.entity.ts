import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED';

export class Transaction implements BaseEntity {
  constructor(
    public readonly id: number,
    public readonly subscriptionId: number,
    public readonly amount: number,
    public readonly date: string,
    public readonly status: TransactionStatus
  ) {}
}
