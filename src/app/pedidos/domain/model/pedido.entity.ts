import { PedidoItem } from './pedido-item.model';
import { PedidoStatus } from './pedido-status.enum';

export class Pedido {
  constructor(
    public id: number,
    public orderId: string,
    public customerId: string,
    public laundryId: string,
    public status: PedidoStatus,
    public createdAt: string,
    public items: PedidoItem[] = [],
    public assignedDriverId: number | null = null,
    public totalWeight: number = 0,
    public totalPrice: number = 0,
    public notes: string | null = null
  ) {}

  markCompleted() {
    this.status = PedidoStatus.COMPLETED;
  }

  markDelivered() {
    this.status = PedidoStatus.DELIVERED;
  }

  cancel() {
    this.status = PedidoStatus.CANCELLED;
  }
}

