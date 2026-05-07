import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError, delay, tap } from 'rxjs';

// Al estar en la misma carpeta, solo usamos ./
import { SignInRequest } from './sign-in.request';
import { SignInResponse } from './sign-in.response';

// Subimos un nivel para ir a application y domain
import { UsersStore } from '../application/users.store';
import { User, UserRole } from '../domain/model/user.entity';
@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private http = inject(HttpClient);
  private store = inject(UsersStore);

  // URL de tu json-server local
  private apiUrl = 'http://localhost:3000/users';

  signIn(request: SignInRequest): Observable<SignInResponse> {
    this.store.setLoading(true);

    // Con json-server, podemos buscar directamente si existe un usuario con ese correo y clave
    const url = `${this.apiUrl}?email=${request.email}&password=${request.password}`;

    return this.http.get<any[]>(url).pipe(
      delay(800), // Mantenemos un pequeño retraso visual para simular la red
      map(users => {
        if (users.length > 0) {
          const userDb = users[0]; // Tomamos el usuario encontrado

          const mockResponse: SignInResponse = {
            token: 'fake-jwt-token-777', // El json-server no genera tokens, así que simulamos uno
            user: {
              id: userDb.id,
              email: userDb.email,
              firstName: userDb.firstName,
              lastName: userDb.lastName,
              role: userDb.role
            }
          };
          return mockResponse;
        } else {
          throw new Error('Correo o contraseña incorrectos');
        }
      }),
      tap({
        next: (response) => {
          const loggedUser = new User(
            response.user.id, response.user.email, response.user.firstName, response.user.lastName, response.user.role as UserRole
          );
          this.store.setCurrentUser(loggedUser);
        },
        error: (err) => {
          this.store.setError(err.message);
        }
      })
    );
  }
}
