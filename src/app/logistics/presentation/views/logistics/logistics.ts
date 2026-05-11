import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogisticsStore, DeliveryFilter } from '../../../application/logistics.store';
import { Delivery, DeliveryStatus } from '../../../domain/model/delivery.entity';

@Component({
  selector: 'app-logistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logistics.html',
  styleUrl: './logistics.css'
})
export class LogisticsComponent implements OnInit {
  readonly store = inject(LogisticsStore);

  readonly filters: { label: string; value: DeliveryFilter }[] = [
    { label: 'Todos', value: 'ALL' },
    { label: 'Pendientes', value: 'PENDING' },
    { label: 'Asignados', value: 'ASSIGNED' },
    { label: 'Recogidos', value: 'PICKED_UP' },
    { label: 'En tránsito', value: 'IN_TRANSIT' },
    { label: 'Entregados', value: 'DELIVERED' },
    { label: 'Fallidos', value: 'FAILED' }
  ];

  ngOnInit(): void {
    this.store.loadAll();
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
    const labels: Record<DeliveryStatus, string> = {
      PENDING: 'Pendiente',
      ASSIGNED: 'Asignado',
      PICKED_UP: 'Recogido',
      IN_TRANSIT: 'En tránsito',
      DELIVERED: 'Entregado',
      FAILED: 'Fallido'
    };
    return labels[status];
  }

  typeLabel(type: string): string {
    return type === 'PICKUP' ? 'Recojo' : 'Entrega';
  }

  trackById(_: number, item: Delivery): number {
    return item.id;
  }
}
