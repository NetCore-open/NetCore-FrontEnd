import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersStore } from './users.store';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(UsersStore);
  const router = inject(Router);

  if (store.isAuthenticated()) {
    return true; // Adelante, puedes pasar
  }

  // Si no está logueado, lo mandamos al login
  return router.parseUrl('/login');
};
