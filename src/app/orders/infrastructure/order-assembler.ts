import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Order } from '../domain/model/order.entity';
import { OrderItem } from '../domain/model/order-item.entity';
import { OrderResource, OrdersResponse, OrderItemResource } from './order.resource';

export class OrderAssembler implements BaseAssembler<Order, OrderResource, OrdersResponse> {
  toEntitiesFromResponse(response: OrdersResponse): Order[] {
    return response.orders.map(r => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: OrderResource): Order {
    return new Order(
      resource.id, resource.userId, resource.laundryId, resource.status,
      resource.items.map(i => this.toItemEntity(i)),
      resource.address, new Date(resource.scheduledPickup),
      resource.notes, new Date(resource.createdAt), new Date(resource.updatedAt)
    );
  }

  toResourceFromEntity(entity: Order): OrderResource {
    return {
      id: entity.id, userId: entity.userId, laundryId: entity.laundryId,
      status: entity.status, items: [], address: entity.address,
      scheduledPickup: entity.scheduledPickup.toISOString(),
      notes: entity.notes, createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString()
    };
  }

  private toItemEntity(dto: OrderItemResource): OrderItem {
    return new OrderItem(dto.id, dto.orderId, dto.garmentType, dto.quantity, dto.unitPrice);
  }
}
