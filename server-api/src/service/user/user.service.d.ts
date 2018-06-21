import * as Promise from 'bluebird';

import { IUser } from '../../models';

export interface IUserService {
  login(login: string, password: string): Promise<boolean>;
  createUser(login: string, password: string): Promise<void>;
  update(login: string, newPassword: string): Promise<void>;
}
