import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingStore } from '../../../application/billing.store';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriptions.html',
  styleUrl: './subscriptions.css'
})
export class SubscriptionsComponent implements OnInit {
  public store = inject(BillingStore);

  ngOnInit() {
    // laundryId hardcodeado para mock, luego vendrá del usuario autenticado
    this.store.loadSubscriptions(1);
  }
}
