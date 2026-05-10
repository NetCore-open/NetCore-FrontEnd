import { Routes } from '@angular/router';
import { SignInComponent } from './users/presentation/views/sign-in/sign-in';
import { SignUpComponent } from './users/presentation/views/sign-up/sign-up';
import { Dashboard } from './layout/views/dashboard/dashboard';
import { authGuard } from './users/application/auth.guard';
import { PlansComponent } from './billing/presentation/views/plans/plans';
import { SubscriptionsComponent } from './billing/presentation/views/subscriptions/subscriptions';
// Asumiendo que tienes o crearás este para Carlos
// import { InventoryComponent } from './admin/views/inventory/inventory';

export const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },

  // 🧺 Ruta para Andrea (Cliente)
  {
    path: 'dashboard',
    component: Dashboard,
    // NOTA: Aquí llamamos a la función con los roles permitidos
    canActivate: [authGuard(['CLIENT'])]
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
