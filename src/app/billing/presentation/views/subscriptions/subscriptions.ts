import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BillingStore } from '../../../application/billing.store';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subscriptions.html',
  styleUrl: './subscriptions.css'
})
export class SubscriptionsComponent implements OnInit {
  public store = inject(BillingStore);

  ngOnInit() {
    this.store.loadSubscriptions(1);
  }
}
