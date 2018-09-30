let validate = require('validate.js');

import {
  injectable,
  inject,
  unmanaged
} from 'inversify';

import {
  ILogger,
  ILoggerFactory
} from '../../../common';
import { IBaseTableModelValidator } from '../interfaces';

@injectable()
export abstract class BaseTableModelValidator<TData, TConstraintsForAdd, TConstraintsForUpdate, TConstraintsForUpsert, TConstraintsForDelete> implements IBaseTableModelValidator<TData> {
  private validationSettings;

  protected constructor(
    @unmanaged() private readonly log: ILogger,
    @unmanaged() private readonly constraintsForAdd: TConstraintsForAdd,
    @unmanaged() private readonly constraintsForUpdate: TConstraintsForUpdate,
    @unmanaged() private readonly constraintsForUpsert: TConstraintsForUpsert,
    @unmanaged() private readonly constraintsForDelete: TConstraintsForDelete,
    @unmanaged() validationSettings?: any,
  ) {
    if (validationSettings) {
      this.validationSettings = validationSettings;
    } else {
      this.validationSettings = { format: 'flat' };
    }
  }

  public validateListForAdd(data: TData[], errors?: Array<string>): boolean {
    return this.validateList(data, this.constraintsForAdd, errors);
  }

  public validateListForUpdate(data: TData[], errors?: Array<string>): boolean {
    return this.validateList(data, this.constraintsForUpdate, errors);
  }

  public validateListForUpsert(data: TData[], errors?: Array<string>): boolean {
    return this.validateList(data, this.constraintsForUpsert, errors);
  }
  public validateListForDelete(data: TData[], errors?: Array<string>): boolean {
    return this.validateList(data, this.constraintsForDelete, errors);
  }

  protected validate(data: TData, constraints: TConstraintsForAdd | TConstraintsForUpdate | TConstraintsForUpsert | TConstraintsForDelete, errors?: Array<string>): boolean {
    let curErrors = validate(data, constraints, this.validationSettings);
    if (curErrors) {
      this.pushErrors(errors, curErrors);
      return false;
    }
    return true;
  }

  protected pushErrors(errors?: string[], newErrors?: string[]): void {
    if (errors !== null && errors !== undefined
      && newErrors !== null && newErrors !== undefined) {
      newErrors.forEach((error) => {
        this.log.warn(error);
        errors.push(error);
      });
    }
  }

  private validateList(list: TData[], constraints: TConstraintsForAdd | TConstraintsForUpdate | TConstraintsForUpsert | TConstraintsForDelete, errors?: Array<string>): boolean {
    let res = true;
    for (let i = 0; i < list.length; i++) {
      let valid = this.validate(list[i], constraints, errors);
      if (!valid) {
        res = false;
      }
    }
    return res;
  }
}

import {
  IntegerConstraints
} from './common-constraints';

import { ICompanyPartner } from '../../../models';

class CompanyPartnerConstraints {
  id = IntegerConstraints;
};

@injectable()
export class CompanyPartnerValidator extends BaseTableModelValidator<ICompanyPartner, CompanyPartnerConstraints, CompanyPartnerConstraints, CompanyPartnerConstraints, CompanyPartnerConstraints> {
  public constructor(
    @inject(Symbol.for('ILoggerFactory')) loggerFactory: ILoggerFactory
  ) {
    let constraints = new CompanyPartnerConstraints();
    super(loggerFactory.getLogger('services.CompanyPartnerValidator'), constraints, constraints, constraints, constraints);
  }
}

import { ICompanyServices } from '../../../models';

class CompanyServicesConstraints {
  id = IntegerConstraints;
};

@injectable()
export class CompanyServicesValidator extends BaseTableModelValidator<ICompanyServices, CompanyServicesConstraints, CompanyServicesConstraints, CompanyServicesConstraints, CompanyServicesConstraints> {
  public constructor(
    @inject(Symbol.for('ILoggerFactory')) loggerFactory: ILoggerFactory
  ) {
    let constraints = new CompanyServicesConstraints();
    super(loggerFactory.getLogger('services.CompanyServicesValidator'), constraints, constraints, constraints, constraints);
  }
}

import { IJobVacancy } from '../../../models';

class JobVacancyConstraints {
  id = IntegerConstraints;
};

@injectable()
export class JobVacancyValidator extends BaseTableModelValidator<IJobVacancy, JobVacancyConstraints, JobVacancyConstraints, JobVacancyConstraints, JobVacancyConstraints> {
  public constructor(
    @inject(Symbol.for('ILoggerFactory')) loggerFactory: ILoggerFactory
  ) {
    let constraints = new JobVacancyConstraints();
    super(loggerFactory.getLogger('services.JobVacancyValidator'), constraints, constraints, constraints, constraints);
  }
}

import { IJobVacancyDescriptionRecord } from '../../../models';

class JobVacancyDescriptionRecordConstraints {
  id = IntegerConstraints;
  jobVacancy = IntegerConstraints;
};

@injectable()
export class JobVacancyDescriptionRecordValidator extends BaseTableModelValidator<IJobVacancyDescriptionRecord, JobVacancyDescriptionRecordConstraints, JobVacancyDescriptionRecordConstraints, JobVacancyDescriptionRecordConstraints, JobVacancyDescriptionRecordConstraints> {
  public constructor(
    @inject(Symbol.for('ILoggerFactory')) loggerFactory: ILoggerFactory
  ) {
    let constraints = new JobVacancyDescriptionRecordConstraints();
    super(loggerFactory.getLogger('services.JobVacancyDescriptionRecordValidator'), constraints, constraints, constraints, constraints);
  }
}


import { ICompanyInfo } from '../../../models';

class CompanyInfoConstraints {
  id = IntegerConstraints;
};

@injectable()
export class CompanyInfoValidator extends BaseTableModelValidator<ICompanyInfo, CompanyInfoConstraints, CompanyInfoConstraints, CompanyInfoConstraints, CompanyInfoConstraints> {
  public constructor(
    @inject(Symbol.for('ILoggerFactory')) loggerFactory: ILoggerFactory
  ) {
    let constraints = new CompanyInfoConstraints();
    super(loggerFactory.getLogger('services.CompanyInfoValidator'), constraints, constraints, constraints, constraints);
  }
}

import { IContact } from '../../../models';

class ContactConstraints {
  id = IntegerConstraints;
};

@injectable()
export class ContactValidator extends BaseTableModelValidator<IContact, ContactConstraints, ContactConstraints, ContactConstraints, ContactConstraints> {
  public constructor(
    @inject(Symbol.for('ILoggerFactory')) loggerFactory: ILoggerFactory
  ) {
    let constraints = new ContactConstraints();
    super(loggerFactory.getLogger('services.ContactValidator'), constraints, constraints, constraints, constraints);
  }
}