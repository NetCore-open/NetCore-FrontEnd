import { OrderItem } from './order-item.entity';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PICKED_UP'
  | 'IN_PROCESS'
  | 'READY'
  | 'DELIVERED'
  | 'CANCELLED';

export class Order {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly laundryId: number,
    public readonly status: OrderStatus,
    public readonly items: OrderItem[],
    public readonly address: string,
    public readonly scheduledPickup: Date,
    public readonly notes: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }
}
