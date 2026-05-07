import { Routes } from '@angular/router';
import { SignInComponent } from './users/presentation/views/sign-in/sign-in';
import { SignUpComponent } from './users/presentation/views/sign-up/sign-up';
import { Dashboard } from './layout/views/dashboard/dashboard';
import { authGuard } from './users/application/auth.guard';

export const routes: Routes = [
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  // Esta ruta está protegida:
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
