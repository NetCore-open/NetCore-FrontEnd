import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BillingStore } from '../../../application/billing.store';
import { CancelSubscriptionCommand } from '../../../domain/model/cancel-subscription.command';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subscriptions.html',
  styleUrl: './subscriptions.css'
})
export class SubscriptionsComponent implements OnInit {
  public store = inject(BillingStore);
  private router = inject(Router);

  ngOnInit() {
    this.store.loadSubscriptions(1);
  }

  onCancelSubscription(subscriptionId: number, laundryId: number) {
    const command = new CancelSubscriptionCommand(subscriptionId, laundryId);
    this.store.cancelSubscription(command);
  }

  onChangePlan() {
    this.router.navigate(['/admin/plans']);
  }
}
