import { NotificationPriority, NotificationType } from '../domain/model/notification.entity';

export interface NotificationResponse {
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
