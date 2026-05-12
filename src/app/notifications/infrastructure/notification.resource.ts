import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { NotificationPriority, NotificationType } from '../domain/model/notification.entity';

export interface NotificationResource extends BaseResource {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface NotificationsResponse extends BaseResponse {
  notifications: NotificationResource[];
}
