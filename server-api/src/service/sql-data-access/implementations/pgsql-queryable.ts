import * as pg from 'pg';
import { QueryConfig } from 'pg';
import * as yesql from 'yesql';
import * as Promise from 'bluebird';
import { ISqlQueryable } from '..';

export class PgSqlQueryable implements ISqlQueryable {
  private queryExecutor: pg.Pool | pg.PoolClient;

  constructor(poolOrConn: pg.Pool | pg.PoolClient) {
    this.queryExecutor = poolOrConn;
  }

  public querySingle<TResult>(sql: string, params: Object): Promise<TResult> {

    return new Promise<TResult>((resolve, reject) => {
      let fixedSql: QueryConfig = yesql.pg(sql)(params);
      this.queryExecutor.query(fixedSql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(<TResult>res.rows[0]);
        }
      });
    });
  }

  public query<TResult>(sql: string, params: Object): Promise<TResult[]> {

    return new Promise<TResult[]>((resolve, reject) => {
      let fixedSql: QueryConfig = yesql.pg(sql)(params);
      this.queryExecutor.query(fixedSql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(<TResult[]>res.rows);
        }
      });
    });
  }
}
