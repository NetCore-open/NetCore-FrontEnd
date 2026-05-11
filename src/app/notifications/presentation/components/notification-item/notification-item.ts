import { Component, computed, input, output } from '@angular/core';
import { Notification, NotificationType } from '../../../domain/model/notification.entity';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon';

const TYPE_ICON: Record<NotificationType, string> = {
  ORDER: 'package',
  LOGISTICS: 'truck',
  BILLING: 'credit-card',
  SYSTEM: 'info',
  PROMO: 'gift'
};

const TYPE_LABEL: Record<NotificationType, string> = {
  ORDER: 'Pedido',
  LOGISTICS: 'Logística',
  BILLING: 'Facturación',
  SYSTEM: 'Sistema',
  PROMO: 'Promoción'
};

@Component({
  selector: 'app-notification-item',
  standalone: true,
  imports: [TimeAgoPipe, IconComponent],
  templateUrl: './notification-item.html',
  styleUrl: './notification-item.css'
})
export class NotificationItemComponent {
  readonly notification = input.required<Notification>();

  readonly markAsRead = output<number>();
  readonly delete = output<number>();

  readonly icon = computed(() => TYPE_ICON[this.notification().type]);
  readonly typeLabel = computed(() => TYPE_LABEL[this.notification().type]);

  onMarkAsRead(event: Event): void {
    event.stopPropagation();
    this.markAsRead.emit(this.notification().id);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.notification().id);
  }

  onCardClick(): void {
    if (!this.notification().isRead) {
      this.markAsRead.emit(this.notification().id);
    }
  }
}
