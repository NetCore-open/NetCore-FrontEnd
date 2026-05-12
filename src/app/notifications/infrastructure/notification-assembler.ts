import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Notification } from '../domain/model/notification.entity';
import { NotificationResource, NotificationsResponse } from './notification.resource';

export class NotificationAssembler implements BaseAssembler<Notification, NotificationResource, NotificationsResponse> {
  toEntitiesFromResponse(response: NotificationsResponse): Notification[] {
    return response.notifications.map(r => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: NotificationResource): Notification {
    return new Notification(
      resource.id, resource.userId, resource.title, resource.message,
      resource.type, resource.priority, resource.isRead,
      new Date(resource.createdAt), resource.link
    );
  }

  toResourceFromEntity(entity: Notification): NotificationResource {
    return {
      id: entity.id, userId: entity.userId, title: entity.title,
      message: entity.message, type: entity.type, priority: entity.priority,
      isRead: entity.isRead, createdAt: entity.createdAt.toISOString(), link: entity.link
    };
  }
}
