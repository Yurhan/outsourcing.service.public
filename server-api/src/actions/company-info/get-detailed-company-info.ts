import * as Promise from 'bluebird';
import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import {
  ICompanyInfo,
  ICompanyPartner,
  ICompanyServices,
  IJobVacancy,
  ICompanyDetailedInfo,
  IContact,
  IPicture,
  IJobVacancyDescriptionRecord
} from '../../models';
import * as TYPES from '../../types';
// import { IPictureService } from '../../service';
// import { NotFoundError } from '../../common';

export function getCompanyDetailedInfoRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.getCompanyInfoRouteHandler');
  logger.info('GET ALL /CompanyInfoDetails');
  let companyInfoservice = req.kernel.get<IDataService<ICompanyInfo>>(TYPES.COMPANY_INFO_SERVICE);
  let companyPartnerservice = req.kernel.get<IDataService<ICompanyPartner>>(TYPES.COMPANY_PARTNER_SERVICE);
  let companyServicesService = req.kernel.get<IDataService<ICompanyServices>>(TYPES.COMPANY_SERVICES_SERVICE);
  let jobVacancyservice = req.kernel.get<IDataService<IJobVacancy>>(TYPES.JOB_VACANSY_SERVICE);
  let contactService = req.kernel.get<IDataService<IContact>>(TYPES.CONTACT_SERVICE);
  let jobVacancyDescRecordService = req.kernel.get<IDataService<IJobVacancyDescriptionRecord>>(TYPES.JOB_VACANCY_DESCRIPTION_RECORD_SERVICE);

  res.jsonPromise(
    Promise.all<any>([
      companyInfoservice.getAll(),
      companyPartnerservice.getAll(),
      companyServicesService.getAll(),
      jobVacancyservice.getAll(),
      contactService.getAll(),
      jobVacancyDescRecordService.getAll()
    ])
      .then(([info, partners, services, vacancies, contacts, jobDescriptions]) => {
        // if (!info) {
        //   throw new NotFoundError('Company Info');
        // }

        if (vacancies && jobDescriptions) {
          vacancies.forEach((v: any) => {
            v.descriptionRecords = jobDescriptions.filter((dec: any) => dec.jobVacancyId === v.id);
          });
        }

        return {
          ...info[0],
          partners: partners,
          services: services,
          jobVacancies: vacancies,
          contact: contacts[0]
        }
      })
  );
}
