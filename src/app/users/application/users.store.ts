import { Injectable, signal, computed } from '@angular/core';
import { User } from '../domain/model/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UsersStore {
  // Estado privado (Signals)
  private _currentUser = signal<User | null>(null);
  private _isLoading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Selectores públicos (lo que verán los componentes)
  public readonly currentUser = computed(() => this._currentUser());
  public readonly isAuthenticated = computed(() => !!this._currentUser());
  public readonly isLoading = computed(() => this._isLoading());
  public readonly error = computed(() => this._error());

  // Acciones (Métodos para cambiar el estado)
  setLoading(value: boolean) {
    this._isLoading.set(value);
  }

  setCurrentUser(user: User | null) {
    this._currentUser.set(user);
    this._isLoading.set(false);
    this._error.set(null);
  }

  setError(message: string) {
    this._error.set(message);
    this._isLoading.set(false);
  }

  logout() {
    this._currentUser.set(null);
  }
}
