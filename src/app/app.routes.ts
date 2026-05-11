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
import { Dashboard } from './layout/views/dashboard/dashboard';
// Asumiendo que tienes o crearás este para Carlos
// import { InventoryComponent } from './admin/views/inventory/inventory';

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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // 🏢 Ruta para Carlos (Administrador)
  {
    path: 'admin/inventory',
    // component: InventoryComponent,
    component: Dashboard, // Uso Dashboard temporalmente para que no te de error si no tienes el otro
    canActivate: [authGuard(['ADMIN'])]
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
