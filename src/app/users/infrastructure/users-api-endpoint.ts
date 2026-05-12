import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { User } from '../domain/model/user.entity';
import { UserResource, UsersResponse } from './user.response';
import { UserAssembler } from './user-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map, catchError } from 'rxjs';
import { SignInCommand } from '../domain/model/sign-in.command';

export class UsersApiEndpoint extends BaseApiEndpoint<User, UserResource, UsersResponse, UserAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.serverBaseUrl}${environment.usersEndpointPath}`, new UserAssembler());
  }

  signIn(command: SignInCommand): Observable<User[]> {
    return this.http.get<UserResource[]>(
      `${this.endpointUrl}?email=${command.email}`
    ).pipe(
      map(resources => {
        const match = resources.filter(r => r.password === command.password);
        return match.map(r => this.assembler.toEntityFromResource(r));
      }),
      catchError(this.handleError('Failed to sign in'))
    );
  }
}
