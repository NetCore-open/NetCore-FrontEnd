import { inject, Injectable, signal } from '@angular/core';
import { PedidosApiService } from '../infrastructure/pedidos-api.service';
import { mapPedidosResponse } from '../infrastructure/pedido.response';
import { Pedido } from '../domain/model/pedido.entity';

@Injectable({ providedIn: 'root' })
export class PedidosStore {
  private api = inject(PedidosApiService);

  private readonly _pedidos = signal<Pedido[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly pedidos = this._pedidos.asReadonly();
  readonly isLoading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  loadPedidos() {
    this._loading.set(true);
    this._error.set(null);
    this.api.getAll().subscribe({
      next: (data) => {
        const list = mapPedidosResponse(data);
        this._pedidos.set(list);
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Error loading pedidos', err);
        this._error.set('No se pudieron cargar pedidos');
        this._loading.set(false);
      }
    });
  }

  deletePedido(id: number) {
    this._loading.set(true);
    this.api.delete(id).subscribe({
      next: () => {
        this._pedidos.set(this._pedidos().filter(p => p.id !== id));
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Error deleting pedido', err);
        this._error.set('No se pudo eliminar el pedido');
        this._loading.set(false);
      }
    });
  }

  markAsCompleted(id: number) {
    this._loading.set(true);
    this.api.update(id, { status: 'COMPLETED' }).subscribe({
      next: (updated) => {
        // update local: marcar el objeto de dominio como completado
        this._pedidos.set(this._pedidos().map(p => {
          if (p.id === id) {
            p.markCompleted();
          }
          return p;
        }));
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Error updating pedido', err);
        this._error.set('No se pudo actualizar el pedido');
        this._loading.set(false);
      }
    });
  }
}


