import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import { IUnitOfWork } from '../../service/unit-of-work';
import { IJobVacancy } from '../../models';
import * as validation from '../../service/validation';
import * as TYPES from '../../types';

export function postJobVacancyRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.postJobVacancyRouteHandler');
  logger.info('Delete /JobVacancy');
  let service = req.kernel.get<IDataService<IJobVacancy>>(Symbol.for('IDataService<IJobVacancy>'));
  let unitOfWork = req.kernel.get<IUnitOfWork>(TYPES.UNIT_OF_WORK);

  let partners: IJobVacancy[] = req.body;

  // if (!validation.isValidInteger(id)) {
  //   res.status(400).send('Invalid timerId parameter');
  //   return;
  // }

  res.jsonPromise(
    unitOfWork.beginAutoCommitTransaction(() => service.updateList(partners))
  );
}
