import { DeliveryStatus, DeliveryType } from '../domain/model/delivery.entity';

export interface CreateDeliveryRequest {
  orderId: number;
  userId: number;
  type: DeliveryType;
  address: string;
  scheduledDate: string;
  notes?: string;
  status: DeliveryStatus;
  driverName: null;
  driverPhone: null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateDeliveryStatusRequest {
  status: DeliveryStatus;
  driverName?: string;
  driverPhone?: string;
  updatedAt: string;
}
