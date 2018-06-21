import * as express from 'express';
import { UnauthorizedError } from '../common/errors';

export function getAuthRequestHandler() {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.isAuthenticated()) {
      return next();
    }

    return next(new UnauthorizedError('unauthorized'));
  };
}