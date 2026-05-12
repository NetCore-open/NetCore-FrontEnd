import { inject, Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../domain/model/user.entity';
import { SignInCommand } from '../domain/model/sign-in.command';
import { UsersApi } from '../infrastructure/users-api';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private api = inject(UsersApi);
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
      next: (users: User[]) => {
        if (users && users.length > 0) {
          const userEntity = users[0];
          this._user.set(userEntity);
          localStorage.setItem('token', 'fake-jwt-token-cleanwave');

          if (userEntity.role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        } else {
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
