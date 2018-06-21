import * as Promise from 'bluebird';
import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import {
  ICompanyInfo,
  ICompanyPartner,
  ICompanyServices,
  IJobVacancy,
  ICompanyDetailedInfo
} from '../../models';
import * as TYPES from '../../types';
// import { NotFoundError } from '../../common';

export function getCompanyDetailedInfoRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.getCompanyInfoRouteHandler');
  logger.info('GET ALL /CompanyInfoDetails');
  let companyInfoservice = req.kernel.get<IDataService<ICompanyInfo>>(Symbol.for('IDataService<ICompanyInfo>'));
  let companyPartnerservice = req.kernel.get<IDataService<ICompanyPartner>>(Symbol.for('IDataService<ICompanyPartner>'));
  let companyServicesService = req.kernel.get<IDataService<ICompanyServices>>(Symbol.for('IDataService<ICompanyServices>'));
  let jobVacancyservice = req.kernel.get<IDataService<IJobVacancy>>(Symbol.for('IDataService<IJobVacancy>'));

  res.jsonPromise(
    Promise.all([
      companyInfoservice.getAll(),
      companyPartnerservice.getAll(),
      companyServicesService.getAll(),
      jobVacancyservice.getAll()
    ])
      .then(([info, partners, services, vacancies]) => {
        // if (!info) {
        //   throw new NotFoundError('Company Info');
        // }
        return {
          id: info[0].id,
          title: info[0].title,
          subTitle: (<any>info[0]).subtitle,
          partners: partners,
          services: services,
          jobVacancies: vacancies
        }
      })
  );
}
