import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Order } from '../domain/model/order.entity';
import { OrderResource, OrdersResponse } from './order.resource';
import { OrderAssembler } from './order-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map, catchError, of } from 'rxjs';
import { CreateOrderCommand } from '../domain/model/create-order.command';
import { UpdateOrderStatusCommand } from '../domain/model/update-order-status.command';

export class OrdersApiEndpoint extends BaseApiEndpoint<Order, OrderResource, OrdersResponse, OrderAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.serverBaseUrl}${environment.ordersEndpointPath}`, new OrderAssembler());
  }

  getAllSorted(): Observable<Order[]> {
    return this.http.get<OrderResource[]>(`${this.endpointUrl}?_sort=-createdAt`).pipe(
      map(items => items.map(i => this.assembler.toEntityFromResource(i))),
      catchError(() => of([]))
    );
  }

  getByUser(userId: number): Observable<Order[]> {
    return this.http.get<OrderResource[]>(`${this.endpointUrl}?userId=${userId}&_sort=-createdAt`).pipe(
      map(items => items.map(i => this.assembler.toEntityFromResource(i))),
      catchError(this.handleError('Failed to fetch user orders'))
    );
  }

  createFromCommand(command: CreateOrderCommand): Observable<Order> {
    const now = new Date().toISOString();
    const body = {
      userId: command.userId, laundryId: command.laundryId,
      status: 'PENDING', items: command.items, address: command.address,
      scheduledPickup: command.scheduledPickup, notes: command.notes ?? null,
      createdAt: now, updatedAt: now
    };
    return this.http.post<OrderResource>(this.endpointUrl, body).pipe(
      map(r => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to create order'))
    );
  }

  updateStatus(command: UpdateOrderStatusCommand): Observable<Order> {
    const body = { status: command.status, updatedAt: new Date().toISOString() };
    return this.http.patch<OrderResource>(`${this.endpointUrl}/${command.id}`, body).pipe(
      map(r => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to update order status'))
    );
  }
}
