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

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        this._user.set(new User(parsed.id, parsed.email, parsed.firstName, parsed.lastName, parsed.role));
      } catch (e) {}
    }
  }

  signIn(command: SignInCommand) {
    this._loading.set(true);
    this._error.set(null);

    this.api.signIn(command).subscribe({
      next: (userData: any) => {
        if (userData && userData.token) {
          const userEntity = new User(
            userData.id,
            userData.username,
            userData.firstName || '',
            userData.lastName || '',
            (userData.roles && userData.roles[0]) as UserRole
          );

          this._user.set(userEntity);
          localStorage.setItem('token', userData.token);
          localStorage.setItem('user', JSON.stringify(userEntity));

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
        this._error.set('Credenciales inválidas o error de conexión');
        this._loading.set(false);
        console.error('Error de login:', err);
      }
    });
  }

  logout() {
    this._user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
