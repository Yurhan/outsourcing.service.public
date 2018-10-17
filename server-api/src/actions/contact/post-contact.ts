import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import { IUnitOfWork } from '../../service/unit-of-work';
import { IContact } from '../../models';
import * as validation from '../../service/validation';
import * as TYPES from '../../types';

export function postContactRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.postContactRouteHandler');
  logger.info('Delete /Contact');
  let service = req.kernel.get<IDataService<IContact>>(Symbol.for('IDataService<IContact>'));
  let unitOfWork = req.kernel.get<IUnitOfWork>(TYPES.UNIT_OF_WORK);

  let contact: IContact = req.body;

  // if (!validation.isValidInteger(id)) {
  //   res.status(400).send('Invalid timerId parameter');
  //   return;
  // }

  res.jsonPromise(
    unitOfWork.beginAutoCommitTransaction(() => service.update(contact))
  );
}
