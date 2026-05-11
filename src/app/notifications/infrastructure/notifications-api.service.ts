import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Notification } from '../domain/model/notification.entity';
import { NotificationResponse } from './notification.response';

@Injectable({ providedIn: 'root' })
export class NotificationsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/notifications';

  getByUser(userId: number): Observable<Notification[]> {
    return this.http
      .get<NotificationResponse[]>(`${this.baseUrl}?userId=${userId}&_sort=-createdAt`)
      .pipe(map((items) => items.map((item) => this.toEntity(item))));
  }

  markAsRead(id: number): Observable<Notification> {
    return this.http
      .patch<NotificationResponse>(`${this.baseUrl}/${id}`, { isRead: true })
      .pipe(map((item) => this.toEntity(item)));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private toEntity(dto: NotificationResponse): Notification {
    return new Notification(
      dto.id,
      dto.userId,
      dto.title,
      dto.message,
      dto.type,
      dto.priority,
      dto.isRead,
      new Date(dto.createdAt),
      dto.link
    );
  }
}
