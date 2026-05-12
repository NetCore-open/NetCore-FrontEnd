import { inject, Injectable, signal, computed } from '@angular/core';
import { Plan, PlanType } from '../domain/model/plan.entity';
import { Subscription, SubscriptionStatus } from '../domain/model/subscription.entity';
import { CreateSubscriptionCommand } from '../domain/model/create-subscription.command';
import { CancelSubscriptionCommand } from '../domain/model/cancel-subscription.command';
import { BillingApiService } from '../infrastructure/billing-api.service';

@Injectable({ providedIn: 'root' })
export class BillingStore {
  private api = inject(BillingApiService);


  private readonly _plans = signal<Plan[]>([]);
  private readonly _subscriptions = signal<Subscription[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);


  readonly plans = this._plans.asReadonly();
  readonly subscriptions = this._subscriptions.asReadonly();
  readonly isLoading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly hasActiveSubscription = computed(() =>
    this._subscriptions().some(s => s.status === 'ACTIVE')
  );

  loadPlans() {
    this._loading.set(true);
    this._error.set(null);

    this.api.getPlans().subscribe({
      next: (data: any[]) => {
        const plans = data.map(p => new Plan(
          p.id, p.name, p.price, p.type as PlanType,
          p.billingPeriod, p.laundryFeatures, p.clientFeatures, p.recommended
        ));
        this._plans.set(plans);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al cargar los planes');
        this._loading.set(false);
        console.error('Error cargando planes:', err);
      }
    });
  }

  loadSubscriptions(laundryId: number) {
    this._loading.set(true);
    this._error.set(null);

    this.api.getSubscriptionsByLaundry(laundryId).subscribe({
      next: (data: any[]) => {
        const subs = data.map(s => new Subscription(
          s.id, s.planId, s.laundryId,
          s.status as SubscriptionStatus, s.startDate, s.endDate
        ));
        this._subscriptions.set(subs);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al cargar las suscripciones');
        this._loading.set(false);
        console.error('Error cargando suscripciones:', err);
      }
    });
  }

  subscribe(command: CreateSubscriptionCommand) {
    this._loading.set(true);
    this._error.set(null);

    const body = {
      planId: command.planId,
      laundryId: command.laundryId,
      status: 'ACTIVE',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0]
    };

    this.api.createSubscription(body).subscribe({
      next: () => {

        this.loadSubscriptions(command.laundryId);
      },
      error: (err) => {
        this._error.set('Error al crear la suscripción');
        this._loading.set(false);
        console.error('Error creando suscripción:', err);
      }
    });
  }

  cancelSubscription(command: CancelSubscriptionCommand) {
    this._loading.set(true);
    this._error.set(null);

    this.api.cancelSubscription(command.subscriptionId).subscribe({
      next: () => {
        this.loadSubscriptions(command.laundryId);
      },
      error: (err) => {
        this._error.set('Error al cancelar la suscripción');
        this._loading.set(false);
        console.error('Error cancelando suscripción:', err);
      }
    });
  }
}
