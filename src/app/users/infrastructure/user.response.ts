import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { UserRole } from '../domain/model/user.entity';

export interface UserResource extends BaseResource {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  password?: string;
}

export interface UsersResponse extends BaseResponse {
  users: UserResource[];
}
