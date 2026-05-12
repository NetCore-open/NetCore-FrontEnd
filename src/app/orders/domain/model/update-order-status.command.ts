import { OrderStatus } from './order.entity';

export interface UpdateOrderStatusCommand {
  id: number;
  status: OrderStatus;
}
