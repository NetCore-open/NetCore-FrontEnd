import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { OrderStatus } from '../domain/model/order.entity';

export interface OrderItemResource {
  id: number;
  orderId: number;
  garmentType: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderResource extends BaseResource {
  id: number;
  userId: number;
  laundryId: number;
  status: OrderStatus;
  items: OrderItemResource[];
  address: string;
  scheduledPickup: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse extends BaseResponse {
  orders: OrderResource[];
}
