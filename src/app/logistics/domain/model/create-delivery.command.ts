import { DeliveryType } from './delivery.entity';

export interface CreateDeliveryCommand {
  orderId: number;
  userId: number;
  type: DeliveryType;
  address: string;
  scheduledDate: string;
  notes?: string;
}
