import * as express from 'express';
import * as postJobVacancyHandler from './post-job-vacancy';
import * as putJobVacancyHandler from './put-job-vacancy';
import * as getJobVacancyDetailsHandler from './get-job-vacancy';
import * as deleteJobVacancyHandler from './delete-job-vacancy';
import { IJsonResponse, IAppRequest } from '../../middlewares';

import { getAuthRequestHandler } from '../../middlewares/auth-request-handler';

export function init(app: express.Application) {

  /**
   * @swagger
   * definitions:
   *   PutJobVacancys:
   *     properties:
   *       name:
   *         type: string
   *         required: true
   *       description:
   *         type: string
   *         required: false
   *       gender:
   *         type: string
   *         required: false
   */

  /**
   * @swagger
   * definitions:
   *   PostJobVacancys:
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
   *       gender:
   *         type: string
   *         required: false
   */


  /**
   * @swagger
   * /job-vacancy:
   *   put:
   *     tags:
   *       - JobVacancy
   *     description: put a JobVacancy
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: JobVacancy object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PutJobVacancys'
   *     responses:
   *       200:
   *         description: Returns JobVacancy object
   */
  app.put('/job-vacancy',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      putJobVacancyHandler.putJobVacancyRouteHandler(req, res);
    });

  /**
   * @swagger
   * /job-vacancy:
   *   post:
   *     tags:
   *       - JobVacancy
   *     description: put a JobVacancy
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: JobVacancy object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/PostJobVacancys'
   *     responses:
   *       200:
   *         description: Returns JobVacancy object
   */
  app.post('/job-vacancy',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      postJobVacancyHandler.postJobVacancyRouteHandler(req, res);
    });

  /**
   * @swagger
   * /job-vacancy:
   *   get:
   *     tags:
   *       - JobVacancy
   *     description: put a JobVacancy
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns List Of JobVacancy object
   */
  app.get('/job-vacancy',
    (req: IAppRequest, res: IJsonResponse) => {
      getJobVacancyDetailsHandler.getJobVacancyRouteHandler(req, res);
    });


  /**
  * @swagger
  * /job-vacancy/{id}:
  *   delete:
  *     tags:
  *       - JobVacancy
  *     description: Delete JobVacancy
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         in: path
  *         description: JobVacancy identifier
  *         required: true
  *         type: number
  *     responses:
  *       200:
  *         description: delete JobVacancy if exists
  */
  app.delete(
    '/job-vacancy/:id',
    getAuthRequestHandler(),
    (req: IAppRequest, res: IJsonResponse) => {
      deleteJobVacancyHandler.deleteJobVacancyRouteHandler(req, res);
    });
}
