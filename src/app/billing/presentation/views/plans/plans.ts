import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  private router = inject(Router);

  ngOnInit() {
    this.store.loadPlans();
  }

  onSelectPlan(planId: number | string) {
    const plan = this.store.plans().find(p => p.id == planId);
    if (plan && plan.type === 'FREE') {
      const command = new CreateSubscriptionCommand(Number(planId), 1);
      this.store.subscribe(command);
    } else {
      this.router.navigate(['/admin/checkout', planId]);
    }
  }
}
