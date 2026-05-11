export type NotificationType = 'ORDER' | 'LOGISTICS' | 'BILLING' | 'SYSTEM' | 'PROMO';

export type NotificationPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export class Notification {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly title: string,
    public readonly message: string,
    public readonly type: NotificationType,
    public readonly priority: NotificationPriority,
    public readonly isRead: boolean,
    public readonly createdAt: Date,
    public readonly link?: string
  ) {}

  markAsRead(): Notification {
    return new Notification(
      this.id,
      this.userId,
      this.title,
      this.message,
      this.type,
      this.priority,
      true,
      this.createdAt,
      this.link
    );
  }
}
