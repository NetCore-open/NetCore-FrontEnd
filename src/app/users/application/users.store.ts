import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../domain/model/user.entity';
import { SignInCommand } from '../domain/model/sign-in.command';
import { UsersApiService } from '../infrastructure/users-api.service';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  // Inyecciones
  private api = inject(UsersApiService);
  private router = inject(Router);

  // Estados Privados (Signals)
  private readonly _user = signal<User | null>(null);
  private readonly _loading = signal<boolean>(false);

  // Selectores Públicos (Read-only para la vista)
  readonly currentUser = this._user.asReadonly();
  readonly isLoading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());

  /**
   * Acción de Inicio de Sesión
   * @param command Contiene email y password
   */
  signIn(command: SignInCommand) {
    this._loading.set(true);

    this.api.signIn(command).subscribe({
      next: (response) => {
        // 1. Extraemos los datos del objeto 'user' que viene en la respuesta
        const { id, email, firstName, lastName, role } = response.user;

        // 2. Creamos la instancia de la Entidad.
        // Usamos 'as UserRole' para solucionar el error de TypeScript.
        const userEntity = new User(
          id,
          email,
          firstName,
          lastName,
          role as UserRole
        );

        // 3. Actualizamos el estado global
        this._user.set(userEntity);

        // 4. Guardamos el token para futuras peticiones
        localStorage.setItem('token', response.token);

        // 5. Navegación inteligente basada en el Rol
        if (userEntity.role === 'ADMIN') {
          // Si es el dueño, lo mandamos a su panel de control
          this.router.navigate(['/admin/inventory']);
        } else {
          // Si es cliente, al dashboard general
          this.router.navigate(['/dashboard']);
        }

        this._loading.set(false);
      },
      error: (err) => {
        console.error('Error en la autenticación:', err);
        this._loading.set(false);
        // Aquí podrías setear una señal de error para mostrar en el HTML
      }
    });
  }

  /**
   * Cierre de sesión y limpieza
   */
  signOut() {
    localStorage.removeItem('token');
    this._user.set(null);
    this.router.navigate(['/login']);
  }
}
