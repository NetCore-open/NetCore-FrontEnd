import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Delivery } from '../domain/model/delivery.entity';
import { DeliveryResource, DeliveriesResponse } from './delivery.resource';

export class DeliveryAssembler implements BaseAssembler<Delivery, DeliveryResource, DeliveriesResponse> {
  toEntitiesFromResponse(response: DeliveriesResponse): Delivery[] {
    return response.deliveries.map(r => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: DeliveryResource): Delivery {
    return new Delivery(
      resource.id, resource.orderId, resource.userId, resource.type, resource.status,
      resource.address, new Date(resource.scheduledDate), resource.driverName,
      resource.driverPhone, resource.notes, new Date(resource.createdAt), new Date(resource.updatedAt)
    );
  }

  toResourceFromEntity(entity: Delivery): DeliveryResource {
    return {
      id: entity.id, orderId: entity.orderId, userId: entity.userId,
      type: entity.type, status: entity.status, address: entity.address,
      scheduledDate: entity.scheduledDate.toISOString(), driverName: entity.driverName,
      driverPhone: entity.driverPhone, notes: entity.notes,
      createdAt: entity.createdAt.toISOString(), updatedAt: entity.updatedAt.toISOString()
    };
  }
}
