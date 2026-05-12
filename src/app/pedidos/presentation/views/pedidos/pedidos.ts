import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosStore } from '../../../application/pedidos.store';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.css']
})
export class PedidosComponent implements OnInit {
  public store = inject(PedidosStore);

  ngOnInit(): void {
    this.store.loadPedidos();
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  onDelete(id: number) {
    this.store.deletePedido(id);
  }

  onMarkCompleted(id: number) {
    this.store.markAsCompleted(id);
  }
}


