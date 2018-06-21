import * as Promise from 'bluebird';
import { ISqlQueryable } from '../../sql-data-access';

export interface IQueryableProvider {
  getQueryable(): ISqlQueryable;
}
