import { IUser } from '../../../models';
import { ISqlTableQueryBuilder, ISqlQuery } from '.';

export interface ISqlUserQueryBuilder extends ISqlTableQueryBuilder<IUser> {
  buildSelectOneByLogin(login: string): ISqlQuery;
}
