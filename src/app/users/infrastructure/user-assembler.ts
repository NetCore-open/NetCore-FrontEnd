import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { User } from '../domain/model/user.entity';
import { UserResource, UsersResponse } from './user.response';

export class UserAssembler implements BaseAssembler<User, UserResource, UsersResponse> {
  toEntitiesFromResponse(response: UsersResponse): User[] {
    return response.users.map(r => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: UserResource): User {
    return new User(resource.id, resource.email, resource.firstName, resource.lastName, resource.role);
  }

  toResourceFromEntity(entity: User): UserResource {
    return { id: entity.id, email: entity.email, firstName: entity.firstName, lastName: entity.lastName, role: entity.role };
  }
}
