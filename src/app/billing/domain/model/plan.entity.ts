export type PlanType = 'FREE' | 'PREMIUM' | 'ANNUAL';

export class Plan {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
    public readonly type: PlanType,
    public readonly billingPeriod: string,
    public readonly laundryFeatures: string[],
    public readonly clientFeatures: string[],
    public readonly recommended: boolean
  ) {}

  // Aquí podríamos agregar métodos de dominio en el futuro
  // ej: isFree(): boolean { return this.type === 'FREE'; }
}
