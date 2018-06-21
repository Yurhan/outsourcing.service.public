import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import { IUnitOfWork } from '../../service/unit-of-work';
import { ICompanyInfo } from '../../models';
import * as validation from '../../service/validation';
import * as TYPES from '../../types';

export function deleteCompanyInfoRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.deleteTimerRouteHandler');
  logger.info('Delete /CompanyInfo');
  let service = req.kernel.get<IDataService<ICompanyInfo>>(Symbol.for('IDataService<ICompanyInfo>'));
  let unitOfWork = req.kernel.get<IUnitOfWork>(TYPES.UNIT_OF_WORK);

  let id: number = req.params.id;

  if (!validation.isValidInteger(id)) {
    res.status(400).send('Invalid timerId parameter');
    return;
  }

  res.jsonPromise(
    unitOfWork.beginTransaction().then(() => service.deleteList([<ICompanyInfo>{ id: id }]))
  );
}
