import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { OrdersApiEndpoint } from './orders-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../domain/model/order.entity';
import { CreateOrderCommand } from '../domain/model/create-order.command';
import { UpdateOrderStatusCommand } from '../domain/model/update-order-status.command';

@Injectable({ providedIn: 'root' })
export class OrdersApi extends BaseApi {
  private readonly ordersEndpoint: OrdersApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.ordersEndpoint = new OrdersApiEndpoint(http);
  }

  getAll(): Observable<Order[]> { return this.ordersEndpoint.getAllSorted(); }
  getByUser(userId: number): Observable<Order[]> { return this.ordersEndpoint.getByUser(userId); }
  getById(id: number): Observable<Order> { return this.ordersEndpoint.getById(id); }
  create(command: CreateOrderCommand): Observable<Order> { return this.ordersEndpoint.createFromCommand(command); }
  updateStatus(command: UpdateOrderStatusCommand): Observable<Order> { return this.ordersEndpoint.updateStatus(command); }
  delete(id: number): Observable<void> { return this.ordersEndpoint.delete(id); }
}
