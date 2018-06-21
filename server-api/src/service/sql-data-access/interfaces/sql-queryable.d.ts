import * as Promise from 'bluebird';

export interface ISqlQueryable {
  querySingle<TResult>(sql: string, params: any): Promise<TResult>;
  query<TResult>(sql: string, params: any): Promise<TResult[]>;
  // endConnections(): Promise<void>;
}
