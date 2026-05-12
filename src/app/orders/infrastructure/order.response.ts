import { OrderStatus } from '../domain/model/order.entity';

export interface OrderItemResponse {
  id: number;
  orderId: number;
  garmentType: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderResponse {
  id: number;
  userId: number;
  laundryId: number;
  status: OrderStatus;
  items: OrderItemResponse[];
  address: string;
  scheduledPickup: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}
