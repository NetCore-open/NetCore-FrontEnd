import { OrderStatus } from '../domain/model/order.entity';
import { OrderItemInput } from '../domain/model/create-order.command';

export interface CreateOrderRequest {
  userId: number;
  laundryId: number;
  status: OrderStatus;
  items: OrderItemInput[];
  address: string;
  scheduledPickup: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  updatedAt: string;
}
