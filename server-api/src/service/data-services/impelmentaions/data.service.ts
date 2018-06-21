import { injectable, unmanaged, inject } from 'inversify';
import * as Promise from 'bluebird';

import {
  BadRequestError
} from '../../../common';

import { IDataService } from '..';

import {
  IQueryableProvider
} from '../../unit-of-work';

import {
  ISqlTableQueryBuilder,
  ISqlQuery
} from '../../sql-building';

import {
  IBaseTableModelValidator
} from '../../validation';

@injectable()
export class BaseDataService<TData> implements IDataService<TData> {

  constructor(
    @unmanaged() protected readonly queryableProvider: IQueryableProvider,
    @unmanaged() protected readonly queryBuilder: ISqlTableQueryBuilder<TData>,
    @unmanaged() protected readonly validator: IBaseTableModelValidator<TData>
  ) { }

  public addList(list: TData[]): Promise<void> {

    if (!list || list.length === 0) {
      return Promise.resolve();
    }

    let errors: string[] = [];
    if (!this.validator.validateListForAdd(list, errors)) {
      return Promise.reject(new BadRequestError(errors.join('.')));
    }

    let sqlQuery = this.queryBuilder.buildInsertRecordsQuery(list);
    return this.queryableProvider.getQueryable().query(sqlQuery, {}).then(() => { });
  }

  public updateList(list: TData[]): Promise<void> {

    if (list.length === 0) {
      return Promise.resolve();
    }

    let errors: string[] = [];
    if (!this.validator.validateListForUpdate(list, errors)) {
      return Promise.reject(new BadRequestError(errors.join('.')));
    }

    let updateRequests = list.map(data => {
      let sqlQuery = this.queryBuilder.buildUpdateRecordQuery(data);
      return this.queryableProvider.getQueryable()
        .query(sqlQuery, {})
        .then(() => { });
    });
    return Promise.all(updateRequests).then(() => { });
  }

  public upsertList(list: TData[]): Promise<void> {
    if (list.length === 0) {
      return Promise.resolve();
    }

    let errors: string[] = [];
    if (!this.validator.validateListForUpdate(list, errors)) {
      return Promise.reject(new BadRequestError(errors.join('.')));
    }

    let upsertQuery = this.queryBuilder.buildUpsertRecordsQuery(list);
    return this.queryableProvider.getQueryable().query(upsertQuery, {}).then(() => { });
  }

  public deleteList(list: TData[]): Promise<void> {

    if (list.length === 0) {
      return Promise.resolve();
    }

    let errors: string[] = [];
    if (!this.validator.validateListForDelete(list, errors)) {
      return Promise.reject(new BadRequestError(errors.join('.')));
    }

    let sqlQuery = this.queryBuilder.buildDeleteRecordsQuery(list);
    return this.queryableProvider.getQueryable().query(sqlQuery, {}).then(() => { });
  }

  public deleteAll(): Promise<void> {
    let sqlQuery = this.queryBuilder.buildDeleteAllRecordsQuery();
    return this.queryableProvider.getQueryable().query(sqlQuery, {}).then(() => { });
  }

  public submitList(list: TData[]): Promise<void> {
    return this.deleteAll().then(() => this.addList(list));
  }

  public add(data: TData): Promise<void> {
    return this.addList([data]);
  }

  public update(data: TData): Promise<void> {
    return this.updateList([data]);
  }

  public upsert(data: TData): Promise<void> {
    return this.upsertList([data]);
  }

  public getAll(): Promise<TData[]> {
    let sqlQuery = this.queryBuilder.buildSelectManyQuery();
    return this.queryableProvider.getQueryable().query<TData>(sqlQuery, {}).then(res => {
      return res;
    });
  }
}

/// COMPANY PARTNERS SERVICE
import {
  ICompanyPartner
} from '../../../models';

export class CompanyPartnerService extends BaseDataService<ICompanyPartner> {
  constructor(
    @inject(Symbol.for('IQueryableProvider')) queryableProvider: IQueryableProvider,
    @inject(Symbol.for('ISqlTableQueryBuilder<ICompanyPartner>')) queryBuilder: ISqlTableQueryBuilder<ICompanyPartner>,
    @inject(Symbol.for('IBaseTableModelValidator<ICompanyPartner>')) validator: IBaseTableModelValidator<ICompanyPartner>,
  ) {
    super(queryableProvider, queryBuilder, validator);
  }
}

/// COMPANY SERVICES SERVICE
import {
  ICompanyServices
} from '../../../models';

export class CompanyServicesService extends BaseDataService<ICompanyServices> {
  constructor(
    @inject(Symbol.for('IQueryableProvider')) queryableProvider: IQueryableProvider,
    @inject(Symbol.for('ISqlTableQueryBuilder<ICompanyServices>')) queryBuilder: ISqlTableQueryBuilder<ICompanyServices>,
    @inject(Symbol.for('IBaseTableModelValidator<ICompanyServices>')) validator: IBaseTableModelValidator<ICompanyServices>,
  ) {
    super(queryableProvider, queryBuilder, validator);
  }
}

/// JOB VACANCY SERVICE
import {
  IJobVacancy
} from '../../../models';

export class JobVacancyService extends BaseDataService<IJobVacancy> {
  constructor(
    @inject(Symbol.for('IQueryableProvider')) queryableProvider: IQueryableProvider,
    @inject(Symbol.for('ISqlTableQueryBuilder<IJobVacancy>')) queryBuilder: ISqlTableQueryBuilder<IJobVacancy>,
    @inject(Symbol.for('IBaseTableModelValidator<IJobVacancy>')) validator: IBaseTableModelValidator<IJobVacancy>,
  ) {
    super(queryableProvider, queryBuilder, validator);
  }
}

/// HOME PAGE INFO SERVICE
import {
  ICompanyInfo
} from '../../../models';

export class CompanyInfoService extends BaseDataService<ICompanyInfo> {
  constructor(
    @inject(Symbol.for('IQueryableProvider')) queryableProvider: IQueryableProvider,
    @inject(Symbol.for('ISqlTableQueryBuilder<ICompanyInfo>')) queryBuilder: ISqlTableQueryBuilder<ICompanyInfo>,
    @inject(Symbol.for('IBaseTableModelValidator<ICompanyInfo>')) validator: IBaseTableModelValidator<ICompanyInfo>,
  ) {
    super(queryableProvider, queryBuilder, validator);
  }
}