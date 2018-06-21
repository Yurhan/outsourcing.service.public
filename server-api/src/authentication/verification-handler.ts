import * as Promise from 'bluebird';

import { VerifyFunctionWithRequest } from 'passport-local';
import { IUserService } from '../service/user';
import { IAppRequest } from '../middlewares';

import * as TYPES from '../types';

export function getVerificationHandler(): VerifyFunctionWithRequest {
  return (req, username, password, done): Promise<void> => {
    // This should ALWAYS be a correct cast
    let kernel = (<IAppRequest><any>req).kernel;
    if (kernel === undefined) {
      return Promise.reject(new Error('Field `req` should be of `IAppRequest` type'));
    }

    let userService = kernel.get<IUserService>(TYPES.USER_SERVICE);

    return userService.login(username, password).then((userConetxt) => {
      console.log('was here');
      return done(null, username);
    }).catch((error) => {
      return done(error, null);
    });
  }
}
