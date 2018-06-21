import * as express from 'express';
import * as postCompanyInfoHandler from './post-company-info';
import * as putCompanyInfoHandler from './put-company-info';
import * as getCompanyInfoHandler from './get-company-info';
import * as getDetailedCompanyInfoHandler from './get-detailed-company-info';
import * as submitCompanyDetailedInfoHanlder from './submit-company-detailed-info';
import * as deleteCompanyInfoHandler from './delete-company-info';
import { IJsonResponse, IAppRequest } from '../../middlewares';

import { getAuthRequestHandler } from '../../middlewares/auth-request-handler';

export function init(app: express.Application) {

  /**
   * @swagger
   * definitions:
   *   PutCompanyInfos:
   *     properties:
   *       name:
   *         type: string
   *         required: true
   *       description:
   *         type: string
   *         required: false
   */

  /**
   * @swagger
   * definitions:
   *   PostCompanyInfos:
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
   */

  /**
   * @swagger
   * /company-info/details:
   *   post:
   *     tags:
   *       - CompanyInfo
   *     description: post a detiled company info
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: CompanyDetailedInfo object
   *         in: body
   *         required: true
   *     responses:
   *       200:
   *         description: Returns Detailed CompanyInfo  object
   */
  app.post('/company-info/details',
    (req: IAppRequest, res: IJsonResponse) => {
      submitCompanyDetailedInfoHanlder.submitCompanyDetailedInfoRouteHandler(req, res);
    });


  /**
   * @swagger
   * /company-info/details:
   *   get:
   *     tags:
   *       - CompanyInfo
   *     description: get a detiled company info
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns Detailed CompanyInfo  object
   */
  app.get('/company-info/details',
    (req: IAppRequest, res: IJsonResponse) => {
      getDetailedCompanyInfoHandler.getCompanyDetailedInfoRouteHandler(req, res);
    });

  /**
   * @swagger
   * /company-info:
   *   put:
   *     tags:
   *       - CompanyInfo
   *     description: put a CompanyInfo
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: CompanyInfo object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PutCompanyInfos'
   *     responses:
   *       200:
   *         description: Returns CompanyInfo object
   */
  app.put('/company-info',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      putCompanyInfoHandler.putCompanyInfoRouteHandler(req, res);
    });

  /**
   * @swagger
   * /company-info:
   *   post:
   *     tags:
   *       - CompanyInfo
   *     description: post a CompanyInfo
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: CompanyInfo object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PostCompanyInfos'
   *     responses:
   *       200:
   *         description: Returns CompanyInfo object
   */
  app.post('/company-info',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      postCompanyInfoHandler.postCompanyInfoRouteHandler(req, res);
    });

  /**
   * @swagger
   * /company-info:
   *   get:
   *     tags:
   *       - CompanyInfo
   *     description: get a CompanyInfo
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns List Of CompanyInfo object
   */
  app.get('/company-info',
    (req: IAppRequest, res: IJsonResponse) => {
      getCompanyInfoHandler.getCompanyInfoRouteHandler(req, res);
    });

  /**
  * @swagger
  * /company-info/{id}:
  *   delete:
  *     tags:
  *       - CompanyInfo
  *     description: Delete CompanyInfo
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         in: path
  *         description: CompanyInfo identifier
  *         required: true
  *         type: number
  *     responses:
  *       200:
  *         description: delete CompanyInfo if exists
  */
  app.delete(
    '/company-info/:id',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      deleteCompanyInfoHandler.deleteCompanyInfoRouteHandler(req, res);
    });
}
