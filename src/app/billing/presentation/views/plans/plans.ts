import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingStore } from '../../../application/billing.store';
import { CreateSubscriptionCommand } from '../../../domain/model/create-subscription.command';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.html',
  styleUrl: './plans.css'
})
export class PlansComponent implements OnInit {
  public store = inject(BillingStore);

  ngOnInit() {
    this.store.loadPlans();
  }

  onSelectPlan(planId: number) {
    // laundryId hardcodeado para mock, luego vendrá del usuario autenticado
    const command = new CreateSubscriptionCommand(planId, 1);
    this.store.subscribe(command);
  }
}
