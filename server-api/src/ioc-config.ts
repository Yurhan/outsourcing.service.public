import { Kernel } from 'inversify';
import 'reflect-metadata';
// import * as redis from 'redis';
import * as TYPES from './types';

let kernel = new Kernel();

//CONFIG
import {
  IConfig,
  Config
} from './common/config';

kernel.bind<IConfig>(TYPES.CONFIG).to(Config).inSingletonScope;

//LOG
import {
  ILoggerConfig,
  ILoggerFactory,

  LoggerConfig,
  LoggerFactory
} from './common/logger';

kernel.bind<ILoggerConfig>(TYPES.LOGGER_CONFIG).to(LoggerConfig).inSingletonScope;
kernel.bind<ILoggerFactory>(TYPES.LOGGER_FACTORY).to(LoggerFactory).inSingletonScope;

import {
  ICompanyInfo,
  ICompanyPartner,
  ICompanyServices,
  IJobVacancy,
  IUser
} from './models';

//VALIDATION

import {
  IBaseTableModelValidator,
  CompanyInfoValidator,
  CompanyPartnerValidator,
  CompanyServicesValidator,
  JobVacancyValidator
} from './service/validation';

kernel.bind<IBaseTableModelValidator<ICompanyInfo>>(Symbol.for('IBaseTableModelValidator<ICompanyInfo>')).to(CompanyInfoValidator).inSingletonScope;
kernel.bind<IBaseTableModelValidator<ICompanyPartner>>(Symbol.for('IBaseTableModelValidator<ICompanyPartner>')).to(CompanyPartnerValidator).inSingletonScope;
kernel.bind<IBaseTableModelValidator<ICompanyServices>>(Symbol.for('IBaseTableModelValidator<ICompanyServices>')).to(CompanyServicesValidator).inSingletonScope;
kernel.bind<IBaseTableModelValidator<IJobVacancy>>(Symbol.for('IBaseTableModelValidator<IJobVacancy>')).to(JobVacancyValidator).inSingletonScope;

import {
  IQueryValueEscaper,
  PgQueryValueEscaper,
  ISqlTableQueryBuilder,
  SqlCompanyInfoQueryBuilder,
  SqlCompanyPartnerQueryBuilder,
  SqlCompanyServicesQueryBuilder,
  SqlJobVacancyQueryBuilder,
  SqlUserQueryBuilder,
  ISqlUserQueryBuilder
} from './service/sql-building';

kernel.bind<IQueryValueEscaper>(Symbol.for('IQueryValueEscaper')).to(PgQueryValueEscaper).inSingletonScope;
kernel.bind<ISqlTableQueryBuilder<ICompanyInfo>>(Symbol.for('ISqlTableQueryBuilder<ICompanyInfo>')).to(SqlCompanyInfoQueryBuilder).inSingletonScope;
kernel.bind<ISqlTableQueryBuilder<ICompanyPartner>>(Symbol.for('ISqlTableQueryBuilder<ICompanyPartner>')).to(SqlCompanyPartnerQueryBuilder).inSingletonScope;
kernel.bind<ISqlTableQueryBuilder<ICompanyServices>>(Symbol.for('ISqlTableQueryBuilder<ICompanyServices>')).to(SqlCompanyServicesQueryBuilder).inSingletonScope;
kernel.bind<ISqlTableQueryBuilder<IJobVacancy>>(Symbol.for('ISqlTableQueryBuilder<IJobVacancy>')).to(SqlJobVacancyQueryBuilder).inSingletonScope;
kernel.bind<ISqlUserQueryBuilder>(Symbol.for('ISqlUserQueryBuilder')).to(SqlUserQueryBuilder).inSingletonScope;

//SQL DATA ACCESS
import * as pg from 'pg';
import { ISqlDataDriver, PgSqlDataDriver } from './service/sql-data-access';

const sqlConfig = kernel.get<IConfig>(TYPES.CONFIG).get<pg.PoolConfig>('dbConfig');
let pool = new pg.Pool(sqlConfig);
// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err)
//   process.exit(-1)
// });

// pool.connect((err, client, done) => {
//   if (err) throw err;

//   client.query('SELECT * FROM companyInfo', [], (err, res) => {
//     done();
//     console.log(res);
//     client.release();
//   });
// });

kernel.bind<ISqlDataDriver>(Symbol.for('ISqlDataDriver')).toConstantValue(new PgSqlDataDriver(pool));

//TOOLS
import * as fastSHA256 from 'fast-sha256';

import {
  IFastSHA256,
  ISHACryptoProvider,
  SHACryptoProvider
} from './common/tools';

kernel.bind<IFastSHA256>(TYPES.FAST_SHA256).toConstantValue({ hash: fastSHA256.hash });
kernel.bind<ISHACryptoProvider>(TYPES.SHA_CRYPTO_PROVIDER).to(SHACryptoProvider).inSingletonScope;

// //CACHE
// import {
//   ICache,
//   IRedisOptions,
//   RedisCache
// } from './service/cache';

// let cacheOptions = kernel.get<IConfig>(TYPES.CONFIG).get<IRedisOptions>('cacheOptions');
// let cache = new RedisCache(cacheOptions, redis.createClient);
// kernel.bind<ICache>(TYPES.CACHE).toConstantValue(cache);

export default kernel;
