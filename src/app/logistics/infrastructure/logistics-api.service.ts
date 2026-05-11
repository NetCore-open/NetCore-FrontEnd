import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Delivery } from '../domain/model/delivery.entity';
import { DeliveryResponse } from './delivery.response';
import { CreateDeliveryRequest, UpdateDeliveryStatusRequest } from './delivery.request';
import { CreateDeliveryCommand } from '../domain/model/create-delivery.command';
import { UpdateDeliveryStatusCommand } from '../domain/model/update-delivery-status.command';

@Injectable({ providedIn: 'root' })
export class LogisticsApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/deliveries';

  getAll(): Observable<Delivery[]> {
    return this.http
      .get<DeliveryResponse[]>(`${this.baseUrl}?_sort=-createdAt`)
      .pipe(map((items) => items.map((item) => this.toEntity(item))));
  }

  getByUser(userId: number): Observable<Delivery[]> {
    return this.http
      .get<DeliveryResponse[]>(`${this.baseUrl}?userId=${userId}&_sort=-createdAt`)
      .pipe(map((items) => items.map((item) => this.toEntity(item))));
  }

  getById(id: number): Observable<Delivery> {
    return this.http
      .get<DeliveryResponse>(`${this.baseUrl}/${id}`)
      .pipe(map((item) => this.toEntity(item)));
  }

  create(command: CreateDeliveryCommand): Observable<Delivery> {
    const now = new Date().toISOString();
    const request: CreateDeliveryRequest = {
      ...command,
      status: 'PENDING',
      driverName: null,
      driverPhone: null,
      createdAt: now,
      updatedAt: now
    };
    return this.http
      .post<DeliveryResponse>(this.baseUrl, request)
      .pipe(map((item) => this.toEntity(item)));
  }

  updateStatus(command: UpdateDeliveryStatusCommand): Observable<Delivery> {
    const request: UpdateDeliveryStatusRequest = {
      status: command.status,
      driverName: command.driverName,
      driverPhone: command.driverPhone,
      updatedAt: new Date().toISOString()
    };
    return this.http
      .patch<DeliveryResponse>(`${this.baseUrl}/${command.id}`, request)
      .pipe(map((item) => this.toEntity(item)));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private toEntity(dto: DeliveryResponse): Delivery {
    return new Delivery(
      dto.id,
      dto.orderId,
      dto.userId,
      dto.type,
      dto.status,
      dto.address,
      new Date(dto.scheduledDate),
      dto.driverName,
      dto.driverPhone,
      dto.notes,
      new Date(dto.createdAt),
      new Date(dto.updatedAt)
    );
  }
}
