export class CancelSubscriptionCommand {
  constructor(
    public readonly subscriptionId: number,
    public readonly laundryId: number
  ) {}
}
