import { Kernel } from 'inversify';
import 'reflect-metadata';
import * as TYPES from './types';

//UNIT OF WORK 

import {
  IUnitOfWork,
  IQueryableProvider,
  UnitOfWork
} from './service/unit-of-work';

import {
  ISqlDataDriver
} from './service/sql-data-access';

function bindUnitOfWork(iocContainer: Kernel): void {
  let sqlDriver = iocContainer.get<ISqlDataDriver>(TYPES.SQL_DATA_DRIVER);
  let unitOfWork = new UnitOfWork(sqlDriver);
  iocContainer.bind<IUnitOfWork>(TYPES.UNIT_OF_WORK).toConstantValue(unitOfWork);
  iocContainer.bind<IQueryableProvider>(TYPES.QUERY_PROVIDER).toConstantValue(unitOfWork);
}

//SERVICES
import {
  IUserService,
  UserService,
  IDataService,
  CompanyServicesService,
  CompanyInfoService,
  CompanyPartnerService,
  JobVacancyService,
  ContactService,
  IPictureService,
  PictureService
} from './service';
import {
  ICompanyInfo,
  ICompanyPartner,
  ICompanyServices,
  IJobVacancy,
  IContact
} from './models';

function bindServices(kernel: Kernel): void {
  kernel.bind<IUserService>(TYPES.USER_SERVICE).to(UserService);
  kernel.bind<IDataService<ICompanyInfo>>(TYPES.COMPANY_INFO_SERVICE).to(CompanyInfoService);
  kernel.bind<IDataService<ICompanyPartner>>(TYPES.COMPANY_PARTNER_SERVICE).to(CompanyPartnerService);
  kernel.bind<IDataService<ICompanyServices>>(TYPES.COMPANY_SERVICES_SERVICE).to(CompanyServicesService);
  kernel.bind<IDataService<IJobVacancy>>(TYPES.JOB_VACANSY_SERVICE).to(JobVacancyService);
  kernel.bind<IDataService<IContact>>(TYPES.CONTACT_SERVICE).to(ContactService);
  kernel.bind<IPictureService>(TYPES.PICTURE_SERVICE).to(PictureService);
}

export function bindRequestScope(kernel: Kernel): void {
  bindUnitOfWork(kernel);
  bindServices(kernel);
};
