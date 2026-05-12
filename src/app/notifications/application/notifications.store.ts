import { computed, inject, Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Notification, NotificationType } from '../domain/model/notification.entity';
import { NotificationsApi } from '../infrastructure/notifications-api';
import { UsersStore } from '../../users/application/users.store';

export type NotificationFilter = 'ALL' | 'UNREAD' | NotificationType;

@Injectable({ providedIn: 'root' })
export class NotificationsStore {
  private readonly api = inject(NotificationsApi);
  private readonly usersStore = inject(UsersStore);

  private readonly _notifications = signal<Notification[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _filter = signal<NotificationFilter>('ALL');

  readonly notifications = this._notifications.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly filter = this._filter.asReadonly();

  readonly unreadCount = computed(
    () => this._notifications().filter((n: Notification) => !n.isRead).length
  );

  readonly hasNotifications = computed(() => this._notifications().length > 0);

  readonly filteredNotifications = computed(() => {
    const filter = this._filter();
    const list = this._notifications();
    if (filter === 'ALL') return list;
    if (filter === 'UNREAD') return list.filter((n: Notification) => !n.isRead);
    return list.filter((n: Notification) => n.type === filter);
  });

  loadForCurrentUser(): void {
    const user = this.usersStore.currentUser();
    if (!user) return;

    this._loading.set(true);
    this._error.set(null);

    this.api.getByUser(user.id).subscribe({
      next: (items) => {
        this._notifications.set(items);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('No se pudieron cargar las notificaciones');
        this._loading.set(false);
        console.error('Error loading notifications:', err);
      }
    });
  }

  setFilter(filter: NotificationFilter): void {
    this._filter.set(filter);
  }

  markAsRead(id: number): void {
    const target = this._notifications().find((n: Notification) => n.id === id);
    if (!target || target.isRead) return;

    this._notifications.update((list: Notification[]) =>
      list.map((n: Notification) => (n.id === id ? n.markAsRead() : n))
    );

    this.api.markAsRead(id).subscribe({
      error: (err) => {
        console.error('Error marking notification as read:', err);
        this.loadForCurrentUser();
      }
    });
  }

  markAllAsRead(): void {
    const unread = this._notifications().filter((n: Notification) => !n.isRead);
    if (unread.length === 0) return;

    this._notifications.update((list: Notification[]) => list.map((n) => (n.isRead ? n : n.markAsRead())));

    forkJoin(unread.map((n: Notification) => this.api.markAsRead(n.id))).subscribe({
      error: (err) => {
        console.error('Error marking all as read:', err);
        this.loadForCurrentUser();
      }
    });
  }

  delete(id: number): void {
    const previous = this._notifications();
    this._notifications.update((list: Notification[]) => list.filter((n) => n.id !== id));

    this.api.delete(id).subscribe({
      error: (err) => {
        console.error('Error deleting notification:', err);
        this._notifications.set(previous);
      }
    });
  }

  reset(): void {
    this._notifications.set([]);
    this._error.set(null);
    this._filter.set('ALL');
  }
}
