import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { LogisticsApiEndpoint } from './logistics-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../domain/model/delivery.entity';
import { CreateDeliveryCommand } from '../domain/model/create-delivery.command';
import { UpdateDeliveryStatusCommand } from '../domain/model/update-delivery-status.command';

@Injectable({ providedIn: 'root' })
export class LogisticsApi extends BaseApi {
  private readonly logisticsEndpoint: LogisticsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.logisticsEndpoint = new LogisticsApiEndpoint(http);
  }

  getAll(): Observable<Delivery[]> { return this.logisticsEndpoint.getAllSorted(); }
  getByUser(userId: number): Observable<Delivery[]> { return this.logisticsEndpoint.getByUser(userId); }
  getById(id: number): Observable<Delivery> { return this.logisticsEndpoint.getById(id); }
  create(command: CreateDeliveryCommand): Observable<Delivery> { return this.logisticsEndpoint.createFromCommand(command); }
  updateStatus(command: UpdateDeliveryStatusCommand): Observable<Delivery> { return this.logisticsEndpoint.updateStatus(command); }
  delete(id: number): Observable<void> { return this.logisticsEndpoint.delete(id); }
}
