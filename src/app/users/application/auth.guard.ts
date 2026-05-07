import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersStore } from './users.store';

// Lo convertimos en una función que acepta roles
export const authGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const store = inject(UsersStore);
    const router = inject(Router);
    const user = store.currentUser();

    // 1. Verificamos Autenticación (Lo que ya tenías)
    if (!store.isAuthenticated() || !user) {
      return router.parseUrl('/login');
    }

    // 2. Verificamos Roles y Permisos (Lo nuevo)
    if (allowedRoles.includes(user.role)) {
      return true; // Es el rol correcto, puede pasar
    }

    // 3. Si es el rol equivocado (ej. Andrea en zona de Carlos)
    // lo mandamos a su sitio correcto
    return user.role === 'ADMIN'
      ? router.parseUrl('/admin/inventory')
      : router.parseUrl('/dashboard');
  };
};
