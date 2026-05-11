import { Component, computed, inject, OnInit } from '@angular/core';
import { NotificationsStore, NotificationFilter } from '../../../application/notifications.store';
import { NotificationItemComponent } from '../../components/notification-item/notification-item';
import { IconComponent } from '../../../../shared/components/icon/icon';

interface FilterOption {
  value: NotificationFilter;
  label: string;
}

@Component({
  selector: 'app-notifications-center',
  standalone: true,
  imports: [NotificationItemComponent, IconComponent],
  templateUrl: './notifications-center.html',
  styleUrl: './notifications-center.css'
})
export class NotificationsCenterComponent implements OnInit {
  readonly store = inject(NotificationsStore);

  readonly filterOptions: FilterOption[] = [
    { value: 'ALL', label: 'Todas' },
    { value: 'UNREAD', label: 'No leídas' },
    { value: 'ORDER', label: 'Pedidos' },
    { value: 'LOGISTICS', label: 'Logística' },
    { value: 'BILLING', label: 'Facturación' },
    { value: 'SYSTEM', label: 'Sistema' },
    { value: 'PROMO', label: 'Promociones' }
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
