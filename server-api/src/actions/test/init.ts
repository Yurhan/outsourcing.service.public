import * as express from 'express';
import * as testGet from './test-get';
import { IJsonResponse, IAppRequest } from '../../middlewares';

import { getAuthRequestHandler } from '../../middlewares/auth-request-handler';

export function init(app: express.Application) {

  /**
   * @swagger
   * /test:
   *   get:
   *     tags:
   *       - TEST
   *     description: get a detiled company info
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns Detailed CompanyInfo  object
   */
  app.get('/test',
    (req: IAppRequest, res: IJsonResponse) => {
      testGet.testGetRouteHandler(req, res);
    });
}
