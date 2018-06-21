import * as express from 'express';
import { Kernel } from 'inversify';
import { IUserService } from '../../service/user';
import { IUnitOfWork } from '../../service/unit-of-work';
import { IUser } from '../../models'
import * as TYPES from '../../types';

export function getRegisterUserRouteHandler(req: express.Request, res: express.Response, kernel: Kernel) {
  //TODO validation 
  let login: string = req.body.login;
  let password: string = req.body.password;
  //let redirectUrl = req.body.redirectUrl;

  let service = kernel.get<IUserService>(TYPES.USER_SERVICE);
  let unitOfWork = kernel.get<IUnitOfWork>(TYPES.UNIT_OF_WORK);

  unitOfWork.beginAutoCommitTransaction<express.Response>(
    service.createUser(login, password)
      .then(u => {
        //res.redirect(redirectUrl);
        return res.json(true);
      })
  );
}
