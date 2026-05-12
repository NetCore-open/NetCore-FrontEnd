import { computed, inject, Injectable, signal } from '@angular/core';
import { Order, OrderStatus } from '../domain/model/order.entity';
import { OrdersApiService } from '../infrastructure/orders-api.service';
import { UsersStore } from '../../users/application/users.store';
import { CreateOrderCommand } from '../domain/model/create-order.command';
import { UpdateOrderStatusCommand } from '../domain/model/update-order-status.command';

export type OrderFilter = 'ALL' | OrderStatus;

@Injectable({ providedIn: 'root' })
export class OrdersStore {
  private readonly api = inject(OrdersApiService);
  private readonly usersStore = inject(UsersStore);

  private readonly _orders = signal<Order[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _filter = signal<OrderFilter>('ALL');

  readonly orders = this._orders.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly filter = this._filter.asReadonly();

  readonly filteredOrders = computed(() => {
    const filter = this._filter();
    const list = this._orders();
    if (filter === 'ALL') return list;
    return list.filter((o) => o.status === filter);
  });

  readonly pendingCount = computed(
    () => this._orders().filter((o) => o.status === 'PENDING').length
  );

  readonly inProcessCount = computed(
    () => this._orders().filter((o) => o.status === 'IN_PROCESS').length
  );

  readonly readyCount = computed(
    () => this._orders().filter((o) => o.status === 'READY').length
  );

  readonly totalRevenue = computed(() =>
    this._orders()
      .filter((o) => o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + o.total, 0)
  );

  loadAll(): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.getAll().subscribe({
      next: (items) => {
        this._orders.set(items);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('No se pudieron cargar los pedidos');
        this._loading.set(false);
        console.error('Error loading orders:', err);
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
        this._orders.set(items);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('No se pudieron cargar tus pedidos');
        this._loading.set(false);
        console.error('Error loading user orders:', err);
      }
    });
  }

  create(command: CreateOrderCommand): void {
    this._loading.set(true);

    this.api.create(command).subscribe({
      next: (order) => {
        this._orders.update((list) => [order, ...list]);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('No se pudo crear el pedido');
        this._loading.set(false);
        console.error('Error creating order:', err);
      }
    });
  }

  updateStatus(command: UpdateOrderStatusCommand): void {
    const previous = this._orders();

    this._orders.update((list) =>
      list.map((o) =>
        o.id === command.id
          ? new Order(
            o.id,
            o.userId,
            o.laundryId,
            command.status,
            o.items,
            o.address,
            o.scheduledPickup,
            o.notes,
            o.createdAt,
            new Date()
          )
          : o
      )
    );

    this.api.updateStatus(command).subscribe({
      error: (err) => {
        console.error('Error updating order status:', err);
        this._orders.set(previous);
      }
    });
  }

  delete(id: number): void {
    const previous = this._orders();
    this._orders.update((list) => list.filter((o) => o.id !== id));

    this.api.delete(id).subscribe({
      error: (err) => {
        console.error('Error deleting order:', err);
        this._orders.set(previous);
      }
    });
  }

  setFilter(filter: OrderFilter): void {
    this._filter.set(filter);
  }

  reset(): void {
    this._orders.set([]);
    this._error.set(null);
    this._filter.set('ALL');
  }
}
