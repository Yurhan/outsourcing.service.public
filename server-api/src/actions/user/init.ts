import * as express from 'express';
import * as register from './register';
import * as passport from 'passport';
import { IAppRequest } from '../../middlewares';

export function init(app: express.Application) {
  /**
   * @swagger
   * definitions:
   *   User:
   *     properties:
   *       login:
   *         type: string
   *         required: true
   *       password:
   *         type: string
   *         required: true
   */

  /**
   * @swagger
   * /user/register:
   *   post:
   *     tags:
   *       - User
   *     description: regsiter new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/User'
   *     responses:
   *       200:
   *         description: redirect to home page
   */
  app.post('/user/register', (req: IAppRequest, res: express.Response) => {
    register.getRegisterUserRouteHandler(req, res, req.kernel);
  });

  /**
   * @swagger
   * /user/login:
   *   post:
   *     tags:
   *       - User
   *     description: logs in a user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: User username
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User password
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: authentificated successfully
   */
  app.post('/user/login', passport.authenticate('local'), (req, res) => {
    res.send(true);
  });

  /**
  * @swagger
  * /user/logout:
  *   get:
  *     tags:
  *       - User
  *     description: Logs out the user
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: true if successfully logged out
  */
  app.get('/user/logout', (req, res) => {
    req.logOut();
    res.send(true);
  });

} 