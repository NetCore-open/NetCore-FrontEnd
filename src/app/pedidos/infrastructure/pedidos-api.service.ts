import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidosApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/pedidos';

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      catchError(() => of([]))
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  update(id: number, payload: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, payload);
  }

  create(payload: any): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }
}

