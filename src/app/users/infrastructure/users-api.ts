import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { UsersApiEndpoint } from './users-api-endpoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../domain/model/user.entity';
import { SignInCommand } from '../domain/model/sign-in.command';

@Injectable({ providedIn: 'root' })
export class UsersApi extends BaseApi {
  private readonly usersEndpoint: UsersApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.usersEndpoint = new UsersApiEndpoint(http);
  }

  signIn(command: SignInCommand): Observable<User[]> {
    return this.usersEndpoint.signIn(command);
  }

  getUserById(id: number): Observable<User> {
    return this.usersEndpoint.getById(id);
  }
}
