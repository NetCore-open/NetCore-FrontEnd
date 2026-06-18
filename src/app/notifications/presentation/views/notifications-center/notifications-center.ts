import { Component, computed, inject, OnInit } from '@angular/core';
import { NotificationsStore, NotificationFilter } from '../../../application/notifications.store';
import { NotificationItemComponent } from '../../components/notification-item/notification-item';
import { IconComponent } from '../../../../shared/components/icon/icon';
import { TranslateModule } from '@ngx-translate/core';

interface FilterOption {
  value: NotificationFilter;
  label: string;
}

@Component({
  selector: 'app-notifications-center',
  standalone: true,
  imports: [NotificationItemComponent, IconComponent, TranslateModule],
  templateUrl: './notifications-center.html',
  styleUrl: './notifications-center.css'
})
export class NotificationsCenterComponent implements OnInit {
  readonly store = inject(NotificationsStore);

  readonly filterOptions: FilterOption[] = [
    { value: 'ALL', label: 'notifications.filter.all' },
    { value: 'UNREAD', label: 'notifications.filter.unread' },
    { value: 'ORDER', label: 'notifications.filter.order' },
    { value: 'LOGISTICS', label: 'notifications.filter.logistics' },
    { value: 'BILLING', label: 'notifications.filter.billing' },
    { value: 'SYSTEM', label: 'notifications.filter.system' },
    { value: 'PROMO', label: 'notifications.filter.promo' }
  ];

  readonly filterCounts = computed(() => {
    const list = this.store.notifications();
    return {
      ALL: list.length,
      UNREAD: list.filter((n: any) => !n.isRead).length,
      ORDER: list.filter((n: any) => n.type === 'ORDER').length,
      LOGISTICS: list.filter((n: any) => n.type === 'LOGISTICS').length,
      BILLING: list.filter((n) => n.type === 'BILLING').length,
      SYSTEM: list.filter((n) => n.type === 'SYSTEM').length,
      PROMO: list.filter((n) => n.type === 'PROMO').length
    } as Record<NotificationFilter, number>;
  });

  ngOnInit(): void {
    this.store.loadForCurrentUser();
  }

  onFilter(value: NotificationFilter): void {
    this.store.setFilter(value);
  }

  onMarkAsRead(id: number): void {
    this.store.markAsRead(id);
  }

  onDelete(id: number): void {
    this.store.delete(id);
  }

  onMarkAllAsRead(): void {
    this.store.markAllAsRead();
  }
}
