import { injectable, unmanaged, inject } from 'inversify';

import { IQueryValueEscaper } from '../interfaces';
import { SqlTableQueryBuilder } from './sql-table-query-builder';
import { table } from './table-decorator';

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
  description: rec => rec.description
})
export class SqlCompanyPartnerQueryBuilder extends SqlTableQueryBuilder<ICompanyPartner> {
  constructor(
    @inject(Symbol.for('IQueryValueEscaper')) queryValueEscaper: IQueryValueEscaper
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
    @inject(Symbol.for('IQueryValueEscaper')) queryValueEscaper: IQueryValueEscaper
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
    @inject(Symbol.for('IQueryValueEscaper')) queryValueEscaper: IQueryValueEscaper
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
    @inject(Symbol.for('IQueryValueEscaper')) queryValueEscaper: IQueryValueEscaper
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
})
export class SqlContactQueryBuilder extends SqlTableQueryBuilder<IContact> {
  constructor(
    @inject(Symbol.for('IQueryValueEscaper')) queryValueEscaper: IQueryValueEscaper
  ) {
    super(queryValueEscaper);
  }
}

//JOB USER SQL BUIDLER
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
    @inject(Symbol.for('IQueryValueEscaper')) queryValueEscaper: IQueryValueEscaper
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
