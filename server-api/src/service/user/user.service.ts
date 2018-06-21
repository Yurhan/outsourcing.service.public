import * as Promise from 'bluebird';
import { inject, injectable } from 'inversify';
import { IUserService } from '.';
import { IUser } from '../../models';
import { BadRequestError } from '../../common';
import { ISqlUserQueryBuilder } from '../sql-building';
import { ISHACryptoProvider } from '../../common';
import { IQueryableProvider } from '../unit-of-work';

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(Symbol.for('ISHACryptoProvider')) private readonly cryptoProvider: ISHACryptoProvider,
    @inject(Symbol.for('IQueryableProvider')) private readonly queryableProvider: IQueryableProvider,
    @inject(Symbol.for('ISqlUserQueryBuilder')) private readonly queryBuilder: ISqlUserQueryBuilder
  ) {
  }

  public login(login: string, password: string): Promise<boolean> {

    if (!login || login.trim() === '') {
      return Promise.reject(new BadRequestError(' Login is required'));
    }

    if (!password || password.trim() === '') {
      return Promise.reject(new BadRequestError('Password is required'));
    }

    let sqlQuery = this.queryBuilder.buildSelectOneByLogin(login);
    return this.queryableProvider.getQueryable()
      .querySingle<IUser>(sqlQuery.sql, sqlQuery.params)
      .then(user => {
        console.log(user);
        return this.cryptoProvider.isEquelHash(Buffer.from(user.password, 'hex'), password);
      });
  }

  public createUser(login: string, password: string): Promise<void> {
    if (!login || login.trim() === '') {
      return Promise.reject(new BadRequestError(' Login is required'));
    }

    if (!password || password.trim() === '') {
      return Promise.reject(new BadRequestError('Password is required'));
    }

    let user: IUser = {
      login: login,
      hashedPassword: this.cryptoProvider.computeHash(password).toString('hex'),
      password: password
    };

    let sql = this.queryBuilder.buildInsertRecordsQuery([user]);
    return this.queryableProvider.getQueryable()
      .querySingle<IUser>(sql, {})
      .then(user => { });
  }

  public update(login: string, password: string): Promise<void> {
    if (!login || login.trim() === '') {
      return Promise.reject(new BadRequestError(' Login is required'));
    }

    if (!password || password.trim() === '') {
      return Promise.reject(new BadRequestError('Password is required'));
    }

    let user: IUser = {
      login: login,
      hashedPassword: this.cryptoProvider.computeHash(password).toString('hex'),
      password: password
    };

    let sql = this.queryBuilder.buildUpdateRecordQuery(user);
    return this.queryableProvider.getQueryable()
      .querySingle<IUser>(sql, {})
      .then(user => { });
  }
}
