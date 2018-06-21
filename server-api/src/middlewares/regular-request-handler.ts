import * as express from 'express';
import { Kernel } from 'inversify';

import { IAppRequest } from './app-request';
import { bindRequestScope } from '../ioc-request-scope-config';

export function addRegularRequestHandler(kernel: Kernel): express.RequestHandler {
  return (req: IAppRequest, res: express.Response, next: express.NextFunction): void => {
    let reqKernel = new Kernel();
    reqKernel.parent = kernel;
    req.kernel = reqKernel;
    bindRequestScope(req.kernel);
    next();
    return;
  }
}
