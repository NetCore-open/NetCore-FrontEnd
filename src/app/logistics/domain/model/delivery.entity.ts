import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type DeliveryStatus = 'PENDING' | 'ASSIGNED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';
export type DeliveryType = 'PICKUP' | 'DELIVERY';

export class Delivery implements BaseEntity {
  constructor(
    public readonly id: number,
    public readonly orderId: number,
    public readonly userId: number,
    public readonly type: DeliveryType,
    public readonly status: DeliveryStatus,
    public readonly address: string,
    public readonly scheduledDate: Date,
    public readonly driverName: string | null,
    public readonly driverPhone: string | null,
    public readonly notes: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
