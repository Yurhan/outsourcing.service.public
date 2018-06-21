import * as express from 'express';
import * as postCompanyServicesHandler from './post-company-services';
import * as putCompanyServicesHandler from './put-company-services';
import * as getCompanyServicesDetailsHandler from './get-company-services';
import * as deleteCompanyServicesHandler from './delete-company-services';
import { IJsonResponse, IAppRequest } from '../../middlewares';

import { getAuthRequestHandler } from '../../middlewares/auth-request-handler';

export function init(app: express.Application) {

  /**
   * @swagger
   * definitions:
   *   PutCompanyServicess:
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
   *   PostCompanyServicess:
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
   * /company-services:
   *   put:
   *     tags:
   *       - CompanyServices
   *     description: put a CompanyServices
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: CompanyServices object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PutCompanyServicess'
   *     responses:
   *       200:
   *         description: Returns CompanyServices object
   */
  app.put('/company-services',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      putCompanyServicesHandler.putCompanyServicesRouteHandler(req, res);
    });

  /**
   * @swagger
   * /company-services:
   *   post:
   *     tags:
   *       - CompanyServices
   *     description: put a CompanyServices
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: CompanyServices object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PostCompanyServicess'
   *     responses:
   *       200:
   *         description: Returns CompanyServices object
   */
  app.post('/company-services',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      postCompanyServicesHandler.postCompanyServicesRouteHandler(req, res);
    });

  /**
   * @swagger
   * /company-services:
   *   get:
   *     tags:
   *       - CompanyServices
   *     description: put a CompanyServices
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns List Of CompanyServices object
   */
  app.get('/company-services',
    (req: IAppRequest, res: IJsonResponse) => {
      getCompanyServicesDetailsHandler.getCompanyServicesRouteHandler(req, res);
    });


  /**
  * @swagger
  * /company-services/{id}:
  *   delete:
  *     tags:
  *       - CompanyServices
  *     description: Delete CompanyServices
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         in: path
  *         description: CompanyServices identifier
  *         required: true
  *         type: number
  *     responses:
  *       200:
  *         description: delete CompanyServices if exists
  */
  app.delete(
    '/company-services/:id',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      deleteCompanyServicesHandler.deleteCompanyServicesRouteHandler(req, res);
    });
}
