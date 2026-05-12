import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Delivery } from '../domain/model/delivery.entity';
import { DeliveryResource, DeliveriesResponse } from './delivery.resource';
import { DeliveryAssembler } from './delivery-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map, catchError } from 'rxjs';
import { CreateDeliveryCommand } from '../domain/model/create-delivery.command';
import { UpdateDeliveryStatusCommand } from '../domain/model/update-delivery-status.command';

export class LogisticsApiEndpoint extends BaseApiEndpoint<Delivery, DeliveryResource, DeliveriesResponse, DeliveryAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.serverBaseUrl}${environment.logisticsEndpointPath}`, new DeliveryAssembler());
  }

  getAllSorted(): Observable<Delivery[]> {
    return this.http.get<DeliveryResource[]>(`${this.endpointUrl}?_sort=-createdAt`).pipe(
      map(items => items.map(i => this.assembler.toEntityFromResource(i))),
      catchError(this.handleError('Failed to fetch deliveries'))
    );
  }

  getByUser(userId: number): Observable<Delivery[]> {
    return this.http.get<DeliveryResource[]>(`${this.endpointUrl}?userId=${userId}&_sort=-createdAt`).pipe(
      map(items => items.map(i => this.assembler.toEntityFromResource(i))),
      catchError(this.handleError('Failed to fetch user deliveries'))
    );
  }

  createFromCommand(command: CreateDeliveryCommand): Observable<Delivery> {
    const now = new Date().toISOString();
    const body = { ...command, status: 'PENDING', driverName: null, driverPhone: null, createdAt: now, updatedAt: now };
    return this.http.post<DeliveryResource>(this.endpointUrl, body).pipe(
      map(r => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to create delivery'))
    );
  }

  updateStatus(command: UpdateDeliveryStatusCommand): Observable<Delivery> {
    const body = { status: command.status, driverName: command.driverName, driverPhone: command.driverPhone, updatedAt: new Date().toISOString() };
    return this.http.patch<DeliveryResource>(`${this.endpointUrl}/${command.id}`, body).pipe(
      map(r => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError('Failed to update delivery status'))
    );
  }
}
