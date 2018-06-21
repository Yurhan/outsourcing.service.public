import * as Promise from 'bluebird';
import { ISqlQueryable } from './sql-queryable';

export interface ISqlTransaction extends ISqlQueryable {
  isFinished(): boolean;

  commit(): Promise<void>;

  rollback(): Promise<void>;
}
