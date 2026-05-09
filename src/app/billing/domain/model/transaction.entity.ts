export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED';

export class Transaction {
  constructor(
    public readonly id: number,
    public readonly subscriptionId: number,
    public readonly amount: number,
    public readonly date: string,
    public readonly status: TransactionStatus
  ) {}

  // Aquí podríamos agregar métodos de dominio en el futuro
  // ej: isCompleted(): boolean { return this.status === 'COMPLETED'; }
}
