import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInCommand } from '../domain/model/sign-in.command';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/users';

  // CAMBIO CLAVE: Usamos Observable<any[]> y this.http.get
  signIn(command: SignInCommand): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}?email=${command.email}&password=${command.password}`
    );
  }
}
