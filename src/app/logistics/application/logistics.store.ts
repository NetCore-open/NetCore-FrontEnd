import { computed, inject, Injectable, signal } from '@angular/core';
import { Delivery, DeliveryStatus, DeliveryType } from '../domain/model/delivery.entity';
import { LogisticsApiService } from '../infrastructure/logistics-api.service';
import { UsersStore } from '../../users/application/users.store';
import { CreateDeliveryCommand } from '../domain/model/create-delivery.command';
import { UpdateDeliveryStatusCommand } from '../domain/model/update-delivery-status.command';

export type DeliveryFilter = 'ALL' | DeliveryStatus | DeliveryType;

@Injectable({ providedIn: 'root' })
export class LogisticsStore {
  private readonly api = inject(LogisticsApiService);
  private readonly usersStore = inject(UsersStore);

  private readonly _deliveries = signal<Delivery[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _filter = signal<DeliveryFilter>('ALL');

  readonly deliveries = this._deliveries.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly filter = this._filter.asReadonly();

  readonly filteredDeliveries = computed(() => {
    const filter = this._filter();
    const list = this._deliveries();
    if (filter === 'ALL') return list;
    return list.filter(
      (d) => d.status === filter || d.type === filter
    );
  });

  readonly pendingCount = computed(
    () => this._deliveries().filter((d) => d.status === 'PENDING').length
  );

  readonly inTransitCount = computed(
    () => this._deliveries().filter((d) => d.status === 'IN_TRANSIT').length
  );

  readonly deliveredCount = computed(
    () => this._deliveries().filter((d) => d.status === 'DELIVERED').length
  );

  loadAll(): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.getAll().subscribe({
      next: (items) => {
        this._deliveries.set(items);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('No se pudieron cargar los envíos');
        this._loading.set(false);
        console.error('Error loading deliveries:', err);
      }
    });
  }

  loadForCurrentUser(): void {
    const user = this.usersStore.currentUser();
    if (!user) return;

    this._loading.set(true);
    this._error.set(null);

    this.api.getByUser(user.id).subscribe({
      next: (items) => {
        this._deliveries.set(items);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('No se pudieron cargar tus envíos');
        this._loading.set(false);
        console.error('Error loading user deliveries:', err);
      }
    });
  }

  create(command: CreateDeliveryCommand): void {
    this._loading.set(true);

    this.api.create(command).subscribe({
      next: (delivery) => {
        this._deliveries.update((list) => [delivery, ...list]);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('No se pudo crear el envío');
        this._loading.set(false);
        console.error('Error creating delivery:', err);
      }
    });
  }

  updateStatus(command: UpdateDeliveryStatusCommand): void {
    const previous = this._deliveries();

    this._deliveries.update((list) =>
      list.map((d) =>
        d.id === command.id
          ? new Delivery(
            d.id,
            d.orderId,
            d.userId,
            d.type,
            command.status,
            d.address,
            d.scheduledDate,
            command.driverName ?? d.driverName,
            command.driverPhone ?? d.driverPhone,
            d.notes,
            d.createdAt,
            new Date()
          )
          : d
      )
    );

    this.api.updateStatus(command).subscribe({
      error: (err) => {
        console.error('Error updating delivery status:', err);
        this._deliveries.set(previous);
      }
    });
  }

  delete(id: number): void {
    const previous = this._deliveries();
    this._deliveries.update((list) => list.filter((d) => d.id !== id));

    this.api.delete(id).subscribe({
      error: (err) => {
        console.error('Error deleting delivery:', err);
        this._deliveries.set(previous);
      }
    });
  }

  setFilter(filter: DeliveryFilter): void {
    this._filter.set(filter);
  }

  reset(): void {
    this._deliveries.set([]);
    this._error.set(null);
    this._filter.set('ALL');
  }
}
