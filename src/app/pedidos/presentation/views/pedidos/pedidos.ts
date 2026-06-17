import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosStore } from '../../../application/pedidos.store';
import {IconComponent} from '../../../../shared/components/icon/icon';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, IconComponent],
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


