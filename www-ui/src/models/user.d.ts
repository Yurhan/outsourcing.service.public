// export type Role = 'SYS_ADMIN' | 'STAFF';

export interface IUser {

  id: number;

  login: string;

  primaryEmail: string;

  hashedPassword: Buffer;

  password: string;

  passwordConfirmation: string;

  passwordUpdatedAt: Date;

  // role: Role;

  firstName: string;

  lastName: string;
}
