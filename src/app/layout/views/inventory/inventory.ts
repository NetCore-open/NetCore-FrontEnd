import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  unit: string;
  lastRestocked: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class InventoryComponent {

  readonly items: InventoryItem[] = [
    { id: 1,  name: 'Detergente líquido (5L)',    category: 'Limpieza',    stock: 8,   minStock: 10, unit: 'unidades',  lastRestocked: '2026-04-28' },
    { id: 2,  name: 'Suavizante premium (3L)',     category: 'Limpieza',    stock: 14,  minStock: 8,  unit: 'unidades',  lastRestocked: '2026-05-02' },
    { id: 3,  name: 'Blanqueador (1L)',             category: 'Limpieza',    stock: 20,  minStock: 10, unit: 'unidades',  lastRestocked: '2026-05-01' },
    { id: 4,  name: 'Bolsas de entrega (100u)',     category: 'Empaque',     stock: 3,   minStock: 5,  unit: 'paquetes',  lastRestocked: '2026-04-20' },
    { id: 5,  name: 'Ganchos de ropa (50u)',        category: 'Empaque',     stock: 12,  minStock: 5,  unit: 'paquetes',  lastRestocked: '2026-05-03' },
    { id: 6,  name: 'Papel kraft para envolver',   category: 'Empaque',     stock: 4,   minStock: 6,  unit: 'rollos',    lastRestocked: '2026-04-25' },
    { id: 7,  name: 'Filtros de lavadora',         category: 'Maquinaria',  stock: 6,   minStock: 4,  unit: 'unidades',  lastRestocked: '2026-04-15' },
    { id: 8,  name: 'Correas de secadora',         category: 'Maquinaria',  stock: 2,   minStock: 3,  unit: 'unidades',  lastRestocked: '2026-03-10' },
    { id: 9,  name: 'Etiquetas de identificación', category: 'Operaciones', stock: 500, minStock: 100,unit: 'unidades',  lastRestocked: '2026-05-05' },
    { id: 10, name: 'Guantes de trabajo (par)',    category: 'Operaciones', stock: 9,   minStock: 6,  unit: 'pares',     lastRestocked: '2026-05-01' },
    { id: 11, name: 'Removedor de manchas (500ml)',category: 'Limpieza',    stock: 11,  minStock: 8,  unit: 'unidades',  lastRestocked: '2026-05-04' },
    { id: 12, name: 'Plástico protector (m)',      category: 'Empaque',     stock: 80,  minStock: 30, unit: 'metros',    lastRestocked: '2026-04-30' },
  ];

  readonly categories = ['Todos', 'Limpieza', 'Empaque', 'Maquinaria', 'Operaciones'];
  selectedCategory = 'Todos';

  get filteredItems(): InventoryItem[] {
    if (this.selectedCategory === 'Todos') return this.items;
    return this.items.filter(i => i.category === this.selectedCategory);
  }

  get lowStockCount(): number {
    return this.items.filter(i => i.stock <= i.minStock).length;
  }

  get totalItems(): number {
    return this.items.length;
  }

  get okCount(): number {
    return this.items.filter(i => i.stock > i.minStock).length;
  }

  stockStatus(item: InventoryItem): 'critical' | 'low' | 'ok' {
    if (item.stock === 0) return 'critical';
    if (item.stock <= item.minStock) return 'low';
    return 'ok';
  }

  stockLabel(item: InventoryItem): string {
    const s = this.stockStatus(item);
    if (s === 'critical') return 'Sin stock';
    if (s === 'low') return 'Stock bajo';
    return 'Normal';
  }

  stockPercent(item: InventoryItem): number {
    const max = item.minStock * 3;
    return Math.min(100, Math.round((item.stock / max) * 100));
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
  }
}
