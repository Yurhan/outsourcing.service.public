import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { IUserService } from './user.service.d';
import { IUser } from '../../../models';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private http: Http
  ) { }

  public login(username: string, password: string): Observable<boolean> {
    let params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    console.log('login');

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const options = new RequestOptions();
    options.headers = headers;
    options.body = params.toString();

    return this.http.post('/api/user/login', null, options)
      .map((res) => res.text() === 'true')
      .catch((err, caught) => Observable.of(false));
  }

  public register(user: any): Observable<IUser> {
    return this.http.post('/api/user/register', user).map((responce) => responce.json());
  }

  public logout(): Observable<void> {
    return this.http.get('/api/user/logout').map(res => { });
  }
}
