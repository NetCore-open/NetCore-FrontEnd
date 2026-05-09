export class CreateTransactionCommand {
  constructor(
    public readonly subscriptionId: number,
    public readonly amount: number
  ) {}
}
