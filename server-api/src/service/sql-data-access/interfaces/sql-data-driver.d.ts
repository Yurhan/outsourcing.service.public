import * as Promise from 'bluebird';
import { ISqlQueryable } from './sql-queryable';
import { ISqlTransaction } from './sql-transaction';

export interface ISqlDataDriver extends ISqlQueryable {
  createTransaction(): Promise<ISqlTransaction>;
}
