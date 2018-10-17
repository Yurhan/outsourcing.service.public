import * as express from 'express';
import * as postContactHandler from './post-contact';
import * as putContactHandler from './put-contact';
import * as getContactHandler from './get-contact';
import * as deleteContactHandler from './delete-contact';
import { IJsonResponse, IAppRequest } from '../../middlewares';

import { getAuthRequestHandler } from '../../middlewares/auth-request-handler';

export function init(app: express.Application) {

  /**
   * @swagger
   * definitions:
   *   PutContacts:
   *     properties:
   *       name:
   *         type: string
   *         required: true
   *       description:
   *         type: string
   *         required: false
   *       imageRef:
   *         type: string
   *         required: false
   */

  /**
   * @swagger
   * definitions:
   *   PostContacts:
   *     properties:
   *       id:
   *         type: integer
   *         required: true
   *       name:
   *         type: string
   *         required: true
   *       description:
   *         type: string
   *         required: false
   *       imageRef:
   *         type: string
   *         required: false
   */


  /**
   * @swagger
   * /contact:
   *   put:
   *     tags:
   *       - Contact
   *     description: put a Contact
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Contact object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PutContacts'
   *     responses:
   *       200:
   *         description: Returns Contact object
   */
  app.put('/contact',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      putContactHandler.putContactRouteHandler(req, res);
    });

  /**
   * @swagger
   * /contact:
   *   post:
   *     tags:
   *       - Contact
   *     description: post a Contact
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Contact object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PostContacts'
   *     responses:
   *       200:
   *         description: Returns Contact object
   */
  app.post('/contact',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      postContactHandler.postContactRouteHandler(req, res);
    });

  /**
   * @swagger
   * /contact:
   *   get:
   *     tags:
   *       - Contact
   *     description: get a Contact
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns Contact object
   */
  app.get('/contact',
    (req: IAppRequest, res: IJsonResponse) => {
      getContactHandler.getContactRouteHandler(req, res);
    });


  /**
  * @swagger
  * /contact/{id}:
  *   delete:
  *     tags:
  *       - Contact
  *     description: Delete Contact
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         in: path
  *         description: Contact identifier
  *         required: true
  *         type: number
  *     responses:
  *       200:
  *         description: delete Contact if exists
  */
  app.delete(
    '/contact/:id',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      deleteContactHandler.deleteContactRouteHandler(req, res);
    });
}
