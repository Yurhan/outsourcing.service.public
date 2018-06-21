import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import { ICompanyServices } from '../../models';
import * as TYPES from '../../types';

export function getCompanyServicesRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.getCompanyServicesRouteHandler');
  logger.info('GET ALL /CompanyServices');
  let service = req.kernel.get<IDataService<ICompanyServices>>(Symbol.for('IDataService<ICompanyServices>'));

  res.jsonPromise(service.getAll());
}
