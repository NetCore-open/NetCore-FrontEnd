export interface OrderItemInput {
  garmentType: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderCommand {
  userId: number;
  laundryId: number;
  address: string;
  scheduledPickup: string;
  notes?: string;
  items: OrderItemInput[];
}
