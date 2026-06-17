import { Pedido } from '../domain/model/pedido.entity';
import { PedidoItem } from '../domain/model/pedido-item.model';
import { PedidoStatus } from '../domain/model/pedido-status.enum';

export function mapPedidoResponse(json: any): Pedido {
  const items: PedidoItem[] = (json.items || []).map((g: any) => ({ garmentId: g }));

  const status = (PedidoStatus as any)[json.status] || PedidoStatus.REGISTERED;

  return new Pedido(
    Number(json.id),
    json.orderId,
    json.customerId,
    String(json.laundryId),
    status,
    json.createdAt,
    items,
    json.assignedDriverId ?? null,
    json.totalWeight ?? 0,
    json.totalPrice ?? 0,
    json.notes ?? null
  );
}

export function mapPedidosResponse(jsonArray: any[]): Pedido[] {
  return (jsonArray || []).map(mapPedidoResponse);
}

