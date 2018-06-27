import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import { ICompanyInfo } from '../../models';
import * as TYPES from '../../types';

export function getCompanyInfoRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.getCompanyInfoRouteHandler');
  logger.info('GET ALL /CompanyInfo');
  let service = req.kernel.get<IDataService<ICompanyInfo>>(Symbol.for('IDataService<ICompanyInfo>'));

  res.jsonPromise(service.getAll().then(list => list[0]));
}
