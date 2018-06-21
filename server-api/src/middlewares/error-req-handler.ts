import { ILogger } from '../common/logger';
import { RequestError } from '../common/errors';

import * as express from 'express';

export function addErrorRequestHandler(env: any, logger: ILogger): express.ErrorRequestHandler {

  let prepareError = (error: Error) => {
    return {
      success: false,
      data: error.message
    }
  };
  if (env == 'development') {
    prepareError = (error: Error) => {
      return {
        success: false,
        name: error.name,
        data: error.message,
        stackTrace: error.stack
      };
    }
  }

  return (error: RequestError, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    logger.error(error);
    let statusCode = 500;
    if (error instanceof RequestError) {
      statusCode = error.statusCode;
    }

    res.status(statusCode).type('json').send(prepareError(error));
    next();
  }
}
