import * as Promise from 'bluebird';

import {
  ISqlQueryable
} from '../../sql-data-access';

export interface IUnitOfWork {
  beginAutoCommitTransaction<TData>(action: Promise<TData>): Promise<TData>;
  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
