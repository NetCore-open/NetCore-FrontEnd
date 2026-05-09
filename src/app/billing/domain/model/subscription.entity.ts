export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'EXPIRED';

export class Subscription {
  constructor(
    public readonly id: number,
    public readonly planId: number,
    public readonly laundryId: number,
    public readonly status: SubscriptionStatus,
    public readonly startDate: string,
    public readonly endDate: string
  ) {}

  // Aquí podríamos agregar métodos de dominio en el futuro
  // ej: isActive(): boolean { return this.status === 'ACTIVE'; }
}
