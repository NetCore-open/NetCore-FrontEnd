import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersStore, OrderFilter } from '../../../application/orders.store';
import { Order, OrderStatus } from '../../../domain/model/order.entity';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class OrdersComponent implements OnInit {
  readonly store = inject(OrdersStore);

  readonly filters: { label: string; value: OrderFilter }[] = [
    { label: 'Todos', value: 'ALL' },
    { label: 'Pendientes', value: 'PENDING' },
    { label: 'Confirmados', value: 'CONFIRMED' },
    { label: 'Recogidos', value: 'PICKED_UP' },
    { label: 'En proceso', value: 'IN_PROCESS' },
    { label: 'Listos', value: 'READY' },
    { label: 'Entregados', value: 'DELIVERED' },
    { label: 'Cancelados', value: 'CANCELLED' }
  ];

  ngOnInit(): void {
    this.store.loadAll();
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
