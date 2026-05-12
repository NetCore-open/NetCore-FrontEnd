import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Order } from '../domain/model/order.entity';
import { OrderItem } from '../domain/model/order-item.entity';
import { OrderResponse, OrderItemResponse } from './order.response';
import { CreateOrderRequest, UpdateOrderStatusRequest } from './order.request';
import { CreateOrderCommand } from '../domain/model/create-order.command';
import { UpdateOrderStatusCommand } from '../domain/model/update-order-status.command';

@Injectable({ providedIn: 'root' })
export class OrdersApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/orders';

  getAll(): Observable<Order[]> {
    return this.http
      .get<OrderResponse[]>(`${this.baseUrl}?_sort=-createdAt`)
      .pipe(map((items) => items.map((item) => this.toEntity(item))));
  }

  getByUser(userId: number): Observable<Order[]> {
    return this.http
      .get<OrderResponse[]>(`${this.baseUrl}?userId=${userId}&_sort=-createdAt`)
      .pipe(map((items) => items.map((item) => this.toEntity(item))));
  }

  getById(id: number): Observable<Order> {
    return this.http
      .get<OrderResponse>(`${this.baseUrl}/${id}`)
      .pipe(map((item) => this.toEntity(item)));
  }

  create(command: CreateOrderCommand): Observable<Order> {
    const now = new Date().toISOString();
    const request: CreateOrderRequest = {
      userId: command.userId,
      laundryId: command.laundryId,
      status: 'PENDING',
      items: command.items,
      address: command.address,
      scheduledPickup: command.scheduledPickup,
      notes: command.notes ?? null,
      createdAt: now,
      updatedAt: now
    };
    return this.http
      .post<OrderResponse>(this.baseUrl, request)
      .pipe(map((item) => this.toEntity(item)));
  }

  updateStatus(command: UpdateOrderStatusCommand): Observable<Order> {
    const request: UpdateOrderStatusRequest = {
      status: command.status,
      updatedAt: new Date().toISOString()
    };
    return this.http
      .patch<OrderResponse>(`${this.baseUrl}/${command.id}`, request)
      .pipe(map((item) => this.toEntity(item)));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private toEntity(dto: OrderResponse): Order {
    return new Order(
      dto.id,
      dto.userId,
      dto.laundryId,
      dto.status,
      dto.items.map((i) => this.toItemEntity(i)),
      dto.address,
      new Date(dto.scheduledPickup),
      dto.notes,
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  }

  private toItemEntity(dto: OrderItemResponse): OrderItem {
    return new OrderItem(
      dto.id,
      dto.orderId,
      dto.garmentType,
      dto.quantity,
      dto.unitPrice
    );
  }
}
