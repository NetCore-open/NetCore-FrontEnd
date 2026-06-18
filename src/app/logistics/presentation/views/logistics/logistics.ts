import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogisticsStore, DeliveryFilter } from '../../../application/logistics.store';
import { Delivery, DeliveryStatus } from '../../../domain/model/delivery.entity';
import { TranslateModule } from '@ngx-translate/core';

import { UsersStore } from '../../../users/application/users.store';

@Component({
  selector: 'app-logistics',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './logistics.html',
  styleUrl: './logistics.css'
})
export class LogisticsComponent implements OnInit {
  readonly store = inject(LogisticsStore);
  readonly usersStore = inject(UsersStore);

  readonly filters: { i18nKey: string; value: DeliveryFilter }[] = [
    { i18nKey: 'logistics.filter.all', value: 'ALL' },
    { i18nKey: 'logistics.filter.pending', value: 'PENDING' },
    { i18nKey: 'logistics.filter.assigned', value: 'ASSIGNED' },
    { i18nKey: 'logistics.filter.picked-up', value: 'PICKED_UP' },
    { i18nKey: 'logistics.filter.in-transit', value: 'IN_TRANSIT' },
    { i18nKey: 'logistics.filter.delivered', value: 'DELIVERED' },
    { i18nKey: 'logistics.filter.failed', value: 'FAILED' }
  ];

  ngOnInit(): void {
    const user = this.usersStore.currentUser();
    if (user?.role === 'ADMIN' || user?.role === ('ROLE_ADMIN' as any)) {
      this.store.loadAll();
    } else {
      this.store.loadForCurrentUser();
    }
  }

  setFilter(value: DeliveryFilter): void {
    this.store.setFilter(value);
  }

  nextStatus(delivery: Delivery): DeliveryStatus | null {
    const flow: Record<DeliveryStatus, DeliveryStatus | null> = {
      PENDING: 'ASSIGNED',
      ASSIGNED: 'PICKED_UP',
      PICKED_UP: 'IN_TRANSIT',
      IN_TRANSIT: 'DELIVERED',
      DELIVERED: null,
      FAILED: null
    };
    return flow[delivery.status];
  }

  advance(delivery: Delivery): void {
    const next = this.nextStatus(delivery);
    if (!next) return;
    this.store.updateStatus({ id: delivery.id, status: next });
  }

  markFailed(delivery: Delivery): void {
    this.store.updateStatus({ id: delivery.id, status: 'FAILED' });
  }

  statusLabel(status: DeliveryStatus): string {
    return `logistics.status-label.${status.toLowerCase().replace('_', '-')}`;
  }

  typeLabel(type: string): string {
    return `logistics.type-label.${type.toLowerCase()}`;
  }

  trackById(_: number, item: Delivery): number {
    return item.id;
  }
}
