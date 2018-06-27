import * as express from 'express';
import * as postPictureHandler from './post-picture';
import * as getPictureHandler from './get-picture';
import { IJsonResponse, IAppRequest } from '../../middlewares';

import { getAuthRequestHandler } from '../../middlewares/auth-request-handler';

export function init(app: express.Application) {

  /**
   * @swagger
   * /picture/{id}:
   *   get:
   *     tags:
   *       - Picture
   *     description: get picture
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: The id of the picture
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Returns Picture
   */
  app.get('/picture/:id',
    (req: IAppRequest, res: IJsonResponse) => {
      getPictureHandler.getPictureRouteHandler(req, res);
    });

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
