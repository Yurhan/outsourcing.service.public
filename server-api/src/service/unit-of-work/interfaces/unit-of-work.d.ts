import * as Promise from 'bluebird';

export interface IUnitOfWork {
  beginAutoCommitTransaction<TData>(action: () => Promise<TData>): Promise<TData>;
  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
