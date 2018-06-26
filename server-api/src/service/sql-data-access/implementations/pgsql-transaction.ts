import * as pg from 'pg';
import * as Promise from 'bluebird';
import { PgSqlQueryable } from './pgsql-queryable';
import { ISqlTransaction } from '../';
import { injectable } from 'inversify';

@injectable()
export class PgSqlTransaction extends PgSqlQueryable implements ISqlTransaction {
  private conn: pg.PoolClient;
  private _isFinished = false;

  constructor(conn: pg.PoolClient) {
    super(conn);
    this.conn = conn;
  }

  public isFinished(): boolean {
    return this._isFinished;
  }

  public commit(): Promise<void> {
    if (this.isFinished()) {
      return Promise.reject('Cannot call commit on a finished PgSqlTransaction.');
    }

    return new Promise<void>((resolve, reject) => {
      this.conn.query('COMMIT', (err) => {
        this._isFinished = true;
        this.conn.release();
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public rollback(): Promise<void> {
    if (this.isFinished()) {
      return Promise.reject('Cannot call rollback on a finished PgSqlTransaction.');
    }

    return new Promise<void>((resolve, reject) => {
      this.conn.query('ROLLBACK', (err) => {
        this._isFinished = true;
        this.conn.release();
        if (err) {
          reject(`Can't rollback transation ${err.stack}`);
        }
        resolve();
      });
    });
  }
}
