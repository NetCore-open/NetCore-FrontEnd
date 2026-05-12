export class OrderItem {
  constructor(
    public readonly id: number,
    public readonly orderId: number,
    public readonly garmentType: string,
    public readonly quantity: number,
    public readonly unitPrice: number
  ) {}

  get subtotal(): number {
    return this.quantity * this.unitPrice;
  }
}
