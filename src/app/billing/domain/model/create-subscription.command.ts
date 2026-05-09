export class CreateSubscriptionCommand {
  constructor(
    public readonly planId: number,
    public readonly laundryId: number
  ) {}
}
