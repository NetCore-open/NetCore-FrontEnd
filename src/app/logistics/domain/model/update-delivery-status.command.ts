import { DeliveryStatus } from './delivery.entity';

export interface UpdateDeliveryStatusCommand {
  id: number;
  status: DeliveryStatus;
  driverName?: string;
  driverPhone?: string;
}
