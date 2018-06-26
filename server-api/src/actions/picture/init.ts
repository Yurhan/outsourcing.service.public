import * as express from 'express';
import * as postPictureHandler from './post-picture';
import { IJsonResponse, IAppRequest } from '../../middlewares';

import { getAuthRequestHandler } from '../../middlewares/auth-request-handler';

export function init(app: express.Application) {

  /**
   * @swagger
   * /picture:
   *   post:
   *     tags:
   *       - Picture
   *     description: post picture
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Picture file
   *         in: body
   *         required: true
   *     responses:
   *       200:
   *         description: Returns Picture Address
   */
  app.post('/picture',
    (req: IAppRequest, res: IJsonResponse) => {
      postPictureHandler.postPictureHandler(req, res);
    });
}
