import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Notification } from '../domain/model/notification.entity';
import { NotificationResource, NotificationsResponse } from './notification.resource';
import { NotificationAssembler } from './notification-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map, catchError } from 'rxjs';

export class NotificationsApiEndpoint extends BaseApiEndpoint<Notification, NotificationResource, NotificationsResponse, NotificationAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.serverBaseUrl}${environment.notificationsEndpointPath}`, new NotificationAssembler());
  }

  getByUser(userId: number): Observable<Notification[]> {
    return this.http.get<NotificationResource[]>(`${this.endpointUrl}?userId=${userId}&_sort=-createdAt`).pipe(
      map(items => items.map(i => this.assembler.toEntityFromResource(i))),
      catchError(this.handleError('Failed to fetch notifications'))
    );
  }

  markAsRead(id: number): Observable<Notification> {
    return this.http.patch<NotificationResource>(`${this.endpointUrl}/${id}`, { isRead: true }).pipe(
      map(r => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to mark notification as read'))
    );
  }
}
