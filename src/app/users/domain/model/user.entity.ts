export type UserRole = 'ADMIN' | 'CLIENT';

export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly role: UserRole
  ) {}

  // Aquí podríamos agregar métodos de dominio en el futuro
  // ej: isAdmin(): boolean { return this.role === 'ADMIN'; }
}
