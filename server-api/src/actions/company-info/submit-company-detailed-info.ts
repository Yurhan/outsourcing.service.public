import * as Promise from 'bluebird';
import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import { IUnitOfWork } from '../../service/unit-of-work';
import {
  ICompanyInfo,
  IJobVacancy,
  ICompanyPartner,
  ICompanyServices,
  ICompanyDetailedInfo,
  IContact
} from '../../models';
// import * as validation from '../../service/validation';
import * as TYPES from '../../types';

export function submitCompanyDetailedInfoRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.companyInfo.submitCompanyDetailedInfoRouteHandler');
  logger.info('submit /CompanyDetailedInfo');

  let companyInfoService = req.kernel.get<IDataService<ICompanyInfo>>(Symbol.for('IDataService<ICompanyInfo>'));
  let companyServicesService = req.kernel.get<IDataService<ICompanyServices>>(Symbol.for('IDataService<ICompanyServices>'));
  let companyPartnersService = req.kernel.get<IDataService<ICompanyPartner>>(Symbol.for('IDataService<ICompanyPartner>'));
  let jobVacanciesService = req.kernel.get<IDataService<IJobVacancy>>(Symbol.for('IDataService<IJobVacancy>'));
  let contactService = req.kernel.get<IDataService<IContact>>(Symbol.for('IDataService<IContact>'));
  let unitOfWork = req.kernel.get<IUnitOfWork>(TYPES.UNIT_OF_WORK);

  let companyInfo: ICompanyDetailedInfo = req.body;

  //TODO validation

  let promises: Promise<any>[] = [];
  promises.push(
    companyInfo.id > 0
      ? companyInfoService.update(companyInfo)
      : companyInfoService.add(companyInfo)
  );

  promises.push(
    companyInfo.contact.id > 0
      ? contactService.update(companyInfo.contact)
      : contactService.add(companyInfo.contact)
  );

  promises.push(companyServicesService.submitList(companyInfo.services));
  promises.push(companyPartnersService.submitList(companyInfo.partners));
  promises.push(jobVacanciesService.submitList(companyInfo.jobVacancies));

  res.jsonPromise(unitOfWork.beginAutoCommitTransaction(Promise.all(promises)));
}
