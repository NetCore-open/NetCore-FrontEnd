import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersStore, OrderFilter } from '../../../application/orders.store';
import { Order, OrderStatus } from '../../../domain/model/order.entity';
import { TranslateModule } from '@ngx-translate/core';

import { UsersStore } from '../../../users/application/users.store';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class OrdersComponent implements OnInit {
  readonly store = inject(OrdersStore);
  readonly usersStore = inject(UsersStore);

  readonly filters: { i18nKey: string; value: OrderFilter }[] = [
    { i18nKey: 'orders.filter.all', value: 'ALL' },
    { i18nKey: 'orders.filter.pending', value: 'PENDING' },
    { i18nKey: 'orders.filter.confirmed', value: 'CONFIRMED' },
    { i18nKey: 'orders.filter.picked-up', value: 'PICKED_UP' },
    { i18nKey: 'orders.filter.in-process', value: 'IN_PROCESS' },
    { i18nKey: 'orders.filter.ready', value: 'READY' },
    { i18nKey: 'orders.filter.delivered', value: 'DELIVERED' },
    { i18nKey: 'orders.filter.cancelled', value: 'CANCELLED' }
  ];

  ngOnInit(): void {
    const user = this.usersStore.currentUser();
    if (user?.role === 'ADMIN' || user?.role === ('ROLE_ADMIN' as any)) {
      this.store.loadAll();
    } else {
      this.store.loadForCurrentUser();
    }
  }

  setFilter(value: OrderFilter): void {
    this.store.setFilter(value);
  }

  nextStatus(order: Order): OrderStatus | null {
    const flow: Record<OrderStatus, OrderStatus | null> = {
      PENDING: 'CONFIRMED',
      CONFIRMED: 'PICKED_UP',
      PICKED_UP: 'IN_PROCESS',
      IN_PROCESS: 'READY',
      READY: 'DELIVERED',
      DELIVERED: null,
      CANCELLED: null
    };
    return flow[order.status];
  }

  advance(order: Order): void {
    const next = this.nextStatus(order);
    if (!next) return;
    this.store.updateStatus({ id: order.id, status: next });
  }

  cancel(order: Order): void {
    this.store.updateStatus({ id: order.id, status: 'CANCELLED' });
  }

  statusLabel(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
      PENDING: 'Pendiente',
      CONFIRMED: 'Confirmado',
      PICKED_UP: 'Recogido',
      IN_PROCESS: 'En proceso',
      READY: 'Listo',
      DELIVERED: 'Entregado',
      CANCELLED: 'Cancelado'
    };
    return labels[status];
  }

  statusClass(status: OrderStatus): string {
    const classes: Record<OrderStatus, string> = {
      PENDING: 'pending',
      CONFIRMED: 'confirmed',
      PICKED_UP: 'picked-up',
      IN_PROCESS: 'in-process',
      READY: 'ready',
      DELIVERED: 'delivered',
      CANCELLED: 'cancelled'
    };
    return classes[status];
  }

  trackById(_: number, item: Order): number {
    return item.id;
  }
}
