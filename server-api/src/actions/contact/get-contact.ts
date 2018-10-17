import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import { IContact } from '../../models';
import * as TYPES from '../../types';

export function getContactRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.getContactRouteHandler');
  logger.info('GET ALL /Contact');
  let service = req.kernel.get<IDataService<IContact>>(Symbol.for('IDataService<IContact>'));

  res.jsonPromise(service.getAll());
}
