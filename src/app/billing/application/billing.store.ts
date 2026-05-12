import { inject, Injectable, signal, computed } from '@angular/core';
import { Plan } from '../domain/model/plan.entity';
import { Subscription } from '../domain/model/subscription.entity';
import { CreateSubscriptionCommand } from '../domain/model/create-subscription.command';
import { BillingApi } from '../infrastructure/billing-api';

@Injectable({ providedIn: 'root' })
export class BillingStore {
  private api = inject(BillingApi);

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
      next: (plans) => {
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
      next: (subs) => {
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

    this.api.createSubscription(command).subscribe({
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
}
