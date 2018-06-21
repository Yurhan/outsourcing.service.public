import { Observable } from 'rxjs/Rx';
import { IUser } from '../../../models';

export interface IUserService {
  login(username: string, password: string): Observable<boolean>;
  register(user: any): Observable<IUser>;
  logout(): void;
}
