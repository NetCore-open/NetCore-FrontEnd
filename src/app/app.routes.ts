import { Routes } from '@angular/router';
import { SignInComponent } from './users/presentation/views/sign-in/sign-in';
import { SignUpComponent } from './users/presentation/views/sign-up/sign-up';
import { ShellComponent } from './layout/views/shell/shell';
import { ClientDashboardComponent } from './layout/views/client-dashboard/client-dashboard';
import { AdminDashboardComponent } from './layout/views/admin-dashboard/admin-dashboard';
import { NotificationsCenterComponent } from './notifications/presentation/views/notifications-center/notifications-center';
import { authGuard } from './users/application/auth.guard';
import { PlansComponent } from './billing/presentation/views/plans/plans';
import { SubscriptionsComponent } from './billing/presentation/views/subscriptions/subscriptions';
import { LogisticsComponent } from './logistics/presentation/views/logistics/logistics';
import { PedidosComponent } from './pedidos/presentation/views/pedidos/pedidos';

export const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },

  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard(['CLIENT', 'ADMIN'])],
    children: [
      {
        path: 'dashboard',
        component: ClientDashboardComponent,
        canActivate: [authGuard(['CLIENT'])]
      },
      {
        path: 'admin/dashboard',
        component: AdminDashboardComponent,
        canActivate: [authGuard(['ADMIN'])]
      },
      {
        path: 'admin/inventory',
        component: AdminDashboardComponent,
        canActivate: [authGuard(['ADMIN'])]
      },
      {
        path: 'notifications',
        component: NotificationsCenterComponent
      },
      {
        path: 'admin/logistics',
        component: LogisticsComponent,
        canActivate: [authGuard(['ADMIN'])]
      },
      {
        path: 'admin/pedidos',
        component: PedidosComponent,
        canActivate: [authGuard(['ADMIN'])]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  {
    path: 'admin/plans',
    component: PlansComponent,
    canActivate: [authGuard(['ADMIN'])]
  },
  {
    path: 'admin/subscriptions',
    component: SubscriptionsComponent,
    canActivate: [authGuard(['ADMIN'])]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
