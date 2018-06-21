import * as express from 'express';
import * as postCompanyPartnerHandler from './post-company-partner';
import * as putCompanyPartnerHandler from './put-company-partner';
import * as getCompanyPartnerDetailsHandler from './get-company-partner';
import * as deleteCompanyPartnerHandler from './delete-company-partner';
import { IJsonResponse, IAppRequest } from '../../middlewares';

import { getAuthRequestHandler } from '../../middlewares/auth-request-handler';

export function init(app: express.Application) {

  /**
   * @swagger
   * definitions:
   *   PutCompanyPartners:
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
   *   PostCompanyPartners:
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
   * /company-partner:
   *   put:
   *     tags:
   *       - CompanyPartner
   *     description: put a CompanyPartner
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: CompanyPartner object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PutCompanyPartners'
   *     responses:
   *       200:
   *         description: Returns CompanyPartner object
   */
  app.put('/company-partner',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      putCompanyPartnerHandler.putCompanyPartnerRouteHandler(req, res);
    });

  /**
   * @swagger
   * /company-partner:
   *   post:
   *     tags:
   *       - CompanyPartner
   *     description: put a CompanyPartner
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: CompanyPartner object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PostCompanyPartners'
   *     responses:
   *       200:
   *         description: Returns CompanyPartner object
   */
  app.post('/company-partner',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      postCompanyPartnerHandler.postCompanyPartnerRouteHandler(req, res);
    });

  /**
   * @swagger
   * /company-partner:
   *   get:
   *     tags:
   *       - CompanyPartner
   *     description: put a CompanyPartner
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns List Of CompanyPartner object
   */
  app.get('/company-partner',
    (req: IAppRequest, res: IJsonResponse) => {
      getCompanyPartnerDetailsHandler.getCompanyPartnerRouteHandler(req, res);
    });


  /**
  * @swagger
  * /company-partner/{id}:
  *   delete:
  *     tags:
  *       - CompanyPartner
  *     description: Delete CompanyPartner
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         in: path
  *         description: CompanyPartner identifier
  *         required: true
  *         type: number
  *     responses:
  *       200:
  *         description: delete CompanyPartner if exists
  */
  app.delete(
    '/company-partner/:id',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      deleteCompanyPartnerHandler.deleteCompanyPartnerRouteHandler(req, res);
    });
}
