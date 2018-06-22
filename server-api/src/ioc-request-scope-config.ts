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
  let sqlDriver = iocContainer.get<ISqlDataDriver>(Symbol.for('ISqlDataDriver'));
  let unitOfWork = new UnitOfWork(sqlDriver);
  iocContainer.bind<IUnitOfWork>(Symbol.for('IUnitOfWork')).toConstantValue(unitOfWork);
  iocContainer.bind<IQueryableProvider>(Symbol.for('IQueryableProvider')).toConstantValue(unitOfWork);
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
  ContactService
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
  kernel.bind<IDataService<ICompanyInfo>>(Symbol.for('IDataService<ICompanyInfo>')).to(CompanyInfoService);
  kernel.bind<IDataService<ICompanyPartner>>(Symbol.for('IDataService<ICompanyPartner>')).to(CompanyPartnerService);
  kernel.bind<IDataService<ICompanyServices>>(Symbol.for('IDataService<ICompanyServices>')).to(CompanyServicesService);
  kernel.bind<IDataService<IJobVacancy>>(Symbol.for('IDataService<IJobVacancy>')).to(JobVacancyService);
  kernel.bind<IDataService<IContact>>(Symbol.for('IDataService<IContact>')).to(ContactService);
}

export function bindRequestScope(kernel: Kernel): void {
  bindUnitOfWork(kernel);
  bindServices(kernel);
};
