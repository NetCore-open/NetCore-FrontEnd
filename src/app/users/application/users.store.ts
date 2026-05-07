import { inject, Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../domain/model/user.entity';
import { SignInCommand } from '../domain/model/sign-in.command';
import { UsersApiService } from '../infrastructure/users-api.service';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private api = inject(UsersApiService);
  private router = inject(Router);

  // --- Estado Privado ---
  private readonly _user = signal<User | null>(null);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // --- Selectores Públicos ---
  readonly currentUser = this._user.asReadonly();
  readonly isLoading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());

  signIn(command: SignInCommand) {
    this._loading.set(true);
    this._error.set(null);

    this.api.signIn(command).subscribe({
      next: (users: any[]) => { // ¡Ahora recibimos un array de json-server!

        // Si el array trae algo, significa que las credenciales son correctas
        if (users && users.length > 0) {
          const userData = users[0]; // Extraemos el primer usuario de la lista

          const userEntity = new User(
            userData.id,
            userData.email,
            userData.firstName,
            userData.lastName,
            userData.role as UserRole
          );

          this._user.set(userEntity);
          // Como json-server básico no da token, le inventamos uno para engañar al interceptor
          localStorage.setItem('token', 'fake-jwt-token-cleanwave');

          // Redirección según rol (Carlos vs Andrea)
          if (userEntity.role === 'ADMIN') {
            this.router.navigate(['/admin/inventory']);
          } else {
            this.router.navigate(['/client/dashboard']); // Ajusta si en rutas le pusiste solo '/dashboard'
          }
        } else {
          // Si el array viene vacío, no encontró a nadie
          this._error.set('Credenciales inválidas');
        }

        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al conectar con el servidor');
        this._loading.set(false);
        console.error('Error de login:', err);
      }
    });
  }

  logout() {
    this._user.set(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
