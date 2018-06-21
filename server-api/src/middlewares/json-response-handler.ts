import * as express from 'express';
import { IJsonResponse } from './json-response';
import * as Promise from 'bluebird';

export function addJsonResponseHandler() {
  return (req: express.Request, res: IJsonResponse, next: express.NextFunction) => {
    res.jsonPromise = (data: Promise<any>) => {
      data.then((result) => {
        res.type('json').send({
          success: true,
          data: result
        });
      }).catch(err => next(err));
    }

    next();
  };
}
