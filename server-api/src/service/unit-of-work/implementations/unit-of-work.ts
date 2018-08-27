import { inject, injectable } from 'inversify';
import * as Promise from 'bluebird';

import {
  IUnitOfWork,
  IQueryableProvider
} from '../interfaces';

import {
  ISqlDataDriver,
  ISqlQueryable,
  ISqlTransaction
} from '../../sql-data-access';

@injectable()
export class UnitOfWork implements IUnitOfWork, IQueryableProvider {

  private currentTransaction: ISqlTransaction | null;

  constructor(
    @inject(Symbol.for('ISqlDataDriver')) private sqlDataDriver: ISqlDataDriver
  ) {
  }

  public beginAutoCommitTransaction<TData>(action: () => Promise<TData>): Promise<TData> {
    return this.beginTransaction()
      .then(() => action())
      .then(actionRes => Promise.all([Promise.resolve(actionRes), this.commit()]))
      .then(([actionRes]) => actionRes)
      .catch((err) => {
        this.rollback();
        throw err;
      });
  }

  public beginTransaction(): Promise<void> {
    if (this.currentTransaction && !this.currentTransaction.isFinished()) {
      return Promise.reject('Transaction is already created and not finished yet');
    }

    return this.sqlDataDriver.createTransaction()
      .then(t => {
        this.currentTransaction = t;
      });
  }

  public commit(): Promise<void> {
    if (!this.currentTransaction) {
      return Promise.reject('Transaction is not created yet');
    }
    return this.currentTransaction.commit()
      .then(() => { this.currentTransaction = null; });
  }

  public rollback(): Promise<void> {
    if (!this.currentTransaction) {
      return Promise.reject('Transaction is not created yet');
    }
    return this.currentTransaction.rollback()
      .then(() => { this.currentTransaction = null; });
  }

  public getQueryable(): ISqlQueryable {
    return this.currentTransaction ? this.currentTransaction : this.sqlDataDriver;
  }
}
