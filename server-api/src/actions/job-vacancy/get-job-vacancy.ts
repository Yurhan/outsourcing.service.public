import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import { IJobVacancy } from '../../models';
import * as TYPES from '../../types';

export function getJobVacancyRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.getJobVacancyRouteHandler');
  logger.info('GET ALL /JobVacancy');
  let service = req.kernel.get<IDataService<IJobVacancy>>(Symbol.for('IDataService<IJobVacancy>'));

  res.jsonPromise(service.getAll());
}
