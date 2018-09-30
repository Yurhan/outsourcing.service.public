import { injectable, unmanaged, inject } from 'inversify';

import { IQueryValueEscaper } from '../interfaces';
import { SqlTableQueryBuilder } from './sql-table-query-builder';
import { table } from './table-decorator';

import * as TYPES from '../../../types';
//COMPANY PARTNER SQL BUIDLER
import { ICompanyPartner } from '../../../models';

@injectable()
@table<ICompanyPartner>('companyPartner', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    valueFunc: rec => rec.id
  },
  name: rec => rec.name,
  description: rec => rec.description,
  imageref: rec => rec.imageRef
})
export class SqlCompanyPartnerQueryBuilder extends SqlTableQueryBuilder<ICompanyPartner> {
  constructor(
    @inject(TYPES.QUERY_VALUE_ESCAPER) queryValueEscaper: IQueryValueEscaper
  ) {
    super(queryValueEscaper);
  }
}

//COMPANY SERVICES SQL BUIDLER
import { ICompanyServices } from '../../../models';

@injectable()
@table<ICompanyServices>('companyServices', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    valueFunc: rec => rec.id
  },
  name: rec => rec.name,
  description: rec => rec.description
})
export class SqlCompanyServicesQueryBuilder extends SqlTableQueryBuilder<ICompanyServices> {
  constructor(
    @inject(TYPES.QUERY_VALUE_ESCAPER) queryValueEscaper: IQueryValueEscaper
  ) {
    super(queryValueEscaper);
  }
}

//HOME PAGE INFO SQL BUIDLER
import { ICompanyInfo } from '../../../models';

@injectable()
@table<ICompanyInfo>('companyInfo', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    valueFunc: rec => rec.id
  },
  subTitle: rec => rec.subTitle,
  title: rec => rec.title
})
export class SqlCompanyInfoQueryBuilder extends SqlTableQueryBuilder<ICompanyInfo> {
  constructor(
    @inject(TYPES.QUERY_VALUE_ESCAPER) queryValueEscaper: IQueryValueEscaper
  ) {
    super(queryValueEscaper);
  }
}

//JOB VACANCY SQL BUIDLER
import { IJobVacancy } from '../../../models';

@injectable()
@table<IJobVacancy>('jobVacancy', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    valueFunc: rec => rec.id
  },
  name: rec => rec.name,
  description: rec => rec.description,
  gender: rec => rec.gender
})
export class SqlJobVacancyQueryBuilder extends SqlTableQueryBuilder<IJobVacancy> {
  constructor(
    @inject(TYPES.QUERY_VALUE_ESCAPER) queryValueEscaper: IQueryValueEscaper
  ) {
    super(queryValueEscaper);
  }
}

//JOB VACANCY SQL BUIDLER
import { IJobVacancyDescriptionRecord } from '../../../models';

@injectable()
@table<IJobVacancyDescriptionRecord>('job_vacancy_description_record', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    valueFunc: rec => rec.id
  },
  jobVacancyId: rec => (<any>rec).job_vacancy,
  description: rec => rec.description,
  type: rec => rec.type
})
export class SqlJobVacancyDescriptionRecordQueryBuilder extends SqlTableQueryBuilder<IJobVacancyDescriptionRecord> {
  constructor(
    @inject(TYPES.QUERY_VALUE_ESCAPER) queryValueEscaper: IQueryValueEscaper
  ) {
    super(queryValueEscaper);
  }
}



//CONTACT SQL BUIDLER
import { IContact } from '../../../models';

@injectable()
@table<IContact>('contact', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    valueFunc: rec => rec.id
  },
  city: rec => rec.address ? rec.address.city : null,
  street: rec => rec.address ? rec.address.street : null,
  primaryPhone: rec => rec.primaryPhone,
  mobPhones: rec => rec.mobPhones ? rec.mobPhones.join(',') : null,
  ceoName: rec => (<any>rec).ceo_name,
})
export class SqlContactQueryBuilder extends SqlTableQueryBuilder<IContact> {
  constructor(
    @inject(TYPES.QUERY_VALUE_ESCAPER) queryValueEscaper: IQueryValueEscaper
  ) {
    super(queryValueEscaper);
  }
}

//USER SQL BUIDLER
import { IUser } from '../../../models';
import { ISqlUserQueryBuilder, ISqlQuery } from '..';

@injectable()
@table<IUser>('user', {
  login: {
    primaryKey: true,
    valueFunc: rec => rec.login
  },
  password: rec => rec.hashedPassword
})
export class SqlUserQueryBuilder extends SqlTableQueryBuilder<IUser> implements ISqlUserQueryBuilder {

  constructor(
    @inject(TYPES.QUERY_VALUE_ESCAPER) queryValueEscaper: IQueryValueEscaper
  ) {
    super(queryValueEscaper);
  }

  public buildSelectOneByLogin(login: string): ISqlQuery {
    return {
      sql: 'SELECT * FROM "user" WHERE "login" = :login',
      params: {
        login: login
      }
    };
  }
}

//CONTACT SQL BUIDLER
import { IPicture } from '../../../models';

@injectable()
@table<IPicture>('picture', {
  id: {
    primaryKey: true,
    valueFunc: rec => rec.id
  },
  name: rec => rec.name,
  mimeType: rec => rec.mimeType,
  content: rec => rec.content
})
export class SqlPictureQueryBuilder extends SqlTableQueryBuilder<IPicture> {
  constructor(
    @inject(TYPES.QUERY_VALUE_ESCAPER) queryValueEscaper: IQueryValueEscaper
  ) {
    super(queryValueEscaper);
  }
}
