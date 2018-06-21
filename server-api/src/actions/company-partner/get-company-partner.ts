import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import { ICompanyPartner } from '../../models';
import * as TYPES from '../../types';

export function getCompanyPartnerRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.getCompanyPartnerRouteHandler');
  logger.info('GET ALL /companyPartner');
  let service = req.kernel.get<IDataService<ICompanyPartner>>(Symbol.for('IDataService<ICompanyPartner>'));

  res.jsonPromise(service.getAll());
}
