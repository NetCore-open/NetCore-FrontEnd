import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { NotificationsApiEndpoint } from './notifications-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../domain/model/notification.entity';

@Injectable({ providedIn: 'root' })
export class NotificationsApi extends BaseApi {
  private readonly notificationsEndpoint: NotificationsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.notificationsEndpoint = new NotificationsApiEndpoint(http);
  }

  getByUser(userId: number): Observable<Notification[]> { return this.notificationsEndpoint.getByUser(userId); }
  markAsRead(id: number): Observable<Notification> { return this.notificationsEndpoint.markAsRead(id); }
  delete(id: number): Observable<void> { return this.notificationsEndpoint.delete(id); }
}
