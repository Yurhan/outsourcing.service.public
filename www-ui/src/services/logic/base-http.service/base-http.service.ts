import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  ConnectionBackend,
  Http,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response
} from '@angular/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class BaseHttpService extends Http {

  constructor(
    _backend: ConnectionBackend,
    _defaultOptions: RequestOptions,
    private router: Router
  ) {
    super(_backend, _defaultOptions);
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options)
      .catch((error: Response) => {
        if (error.status === 401) {
          return this.router.navigate(['']).then(res => {
            return Observable.empty();
          });
        } else {
          return Observable.throw(error);
        }
      });
  }
}
