import * as pg from 'pg';
import * as Promise from 'bluebird';
import { injectable, inject } from 'inversify';
import { ISqlDataDriver, ISqlTransaction } from '../';
import { PgSqlQueryable } from './pgsql-queryable';
import { PgSqlTransaction } from './pgsql-transaction';
import { resolve } from 'url';

@injectable()
export class PgSqlDataDriver extends PgSqlQueryable implements ISqlDataDriver {

  constructor(@inject(Symbol.for('pg.Pool')) private readonly pool: pg.Pool) {
    super(pool);
  }

  public createTransaction(): Promise<ISqlTransaction> {
    return new Promise<ISqlTransaction>((resolve, reject) => {
      this.pool.connect()
        .then(client => {
          return client.query('BEGIN').then(() => {
            resolve(new PgSqlTransaction(client));
            return;
          })
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public end(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pool.end(() => {
        resolve()
      });
    }).then(() => { });
  }
}
