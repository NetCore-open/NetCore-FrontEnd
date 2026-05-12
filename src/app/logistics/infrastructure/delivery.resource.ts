import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { DeliveryStatus, DeliveryType } from '../domain/model/delivery.entity';

export interface DeliveryResource extends BaseResource {
  id: number;
  orderId: number;
  userId: number;
  type: DeliveryType;
  status: DeliveryStatus;
  address: string;
  scheduledDate: string;
  driverName: string | null;
  driverPhone: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DeliveriesResponse extends BaseResponse {
  deliveries: DeliveryResource[];
}
