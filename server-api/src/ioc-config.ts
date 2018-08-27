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
  IContact
} from './models';

//VALIDATION

import {
  IBaseTableModelValidator,
  CompanyInfoValidator,
  CompanyPartnerValidator,
  CompanyServicesValidator,
  JobVacancyValidator,
  ContactValidator
} from './service/validation';

kernel.bind<IBaseTableModelValidator<ICompanyInfo>>(TYPES.COMPANY_INFO_VALIDATOR).to(CompanyInfoValidator).inSingletonScope;
kernel.bind<IBaseTableModelValidator<ICompanyPartner>>(TYPES.COMPANY_PARTNER_VALIDATOR).to(CompanyPartnerValidator).inSingletonScope;
kernel.bind<IBaseTableModelValidator<ICompanyServices>>(TYPES.COMPANY_SERVICES_VALIDATOR).to(CompanyServicesValidator).inSingletonScope;
kernel.bind<IBaseTableModelValidator<IJobVacancy>>(TYPES.JOB_VACANCY_VALIDATOR).to(JobVacancyValidator).inSingletonScope;
kernel.bind<IBaseTableModelValidator<IContact>>(TYPES.CONTACT_VALIDATOR).to(ContactValidator).inSingletonScope;

import {
  IQueryValueEscaper,
  PgQueryValueEscaper,
  ISqlTableQueryBuilder,
  SqlCompanyInfoQueryBuilder,
  SqlCompanyPartnerQueryBuilder,
  SqlCompanyServicesQueryBuilder,
  SqlJobVacancyQueryBuilder,
  SqlUserQueryBuilder,
  ISqlUserQueryBuilder,
  SqlContactQueryBuilder
} from './service/sql-building';

kernel.bind<IQueryValueEscaper>(TYPES.QUERY_VALUE_ESCAPER).to(PgQueryValueEscaper).inSingletonScope;
kernel.bind<ISqlTableQueryBuilder<ICompanyInfo>>(TYPES.COMPANY_INFO_QUERY_BUILDER).to(SqlCompanyInfoQueryBuilder).inSingletonScope;
kernel.bind<ISqlTableQueryBuilder<ICompanyPartner>>(TYPES.COMPANY_PARTNER_QUERY_BUILDER).to(SqlCompanyPartnerQueryBuilder).inSingletonScope;
kernel.bind<ISqlTableQueryBuilder<ICompanyServices>>(TYPES.COMPANY_SERVICES_QUERY_BUILDER).to(SqlCompanyServicesQueryBuilder).inSingletonScope;
kernel.bind<ISqlTableQueryBuilder<IJobVacancy>>(TYPES.JOB_VACANCY_QUERY_BUILDER).to(SqlJobVacancyQueryBuilder).inSingletonScope;
kernel.bind<ISqlTableQueryBuilder<IContact>>(TYPES.CONTACT_QUERY_BUILDER).to(SqlContactQueryBuilder).inSingletonScope;
kernel.bind<ISqlUserQueryBuilder>(TYPES.USER_QUERY_BUILDER).to(SqlUserQueryBuilder).inSingletonScope;

//SQL DATA ACCESS
import * as pg from 'pg';
import { ISqlDataDriver, PgSqlDataDriver } from './service/sql-data-access';


// let sqlConfig: pg.PoolConfig;
// console.log(process.env);
// if (process.env.NODE_ENV === 'production') {
//   sqlConfig = {
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME
//   }

// } else {
//   sqlConfig = kernel.get<IConfig>(TYPES.CONFIG).get<pg.PoolConfig>('dbConfig');
// }

let sqlConfig: pg.PoolConfig = kernel.get<IConfig>(TYPES.CONFIG).get<pg.PoolConfig>('dbConfig');

console.log(sqlConfig);

let pool = new pg.Pool(sqlConfig);

kernel.bind<ISqlDataDriver>(TYPES.SQL_DATA_DRIVER).toConstantValue(new PgSqlDataDriver(pool));

//TOOLS
import * as fastSHA256 from 'fast-sha256';

import {
  IFastSHA256,
  ISHACryptoProvider,
  SHACryptoProvider,
  IFilePromise,
  FilePromise
} from './common/tools';

kernel.bind<IFastSHA256>(TYPES.FAST_SHA256).toConstantValue({ hash: fastSHA256.hash });
kernel.bind<ISHACryptoProvider>(TYPES.SHA_CRYPTO_PROVIDER).to(SHACryptoProvider).inSingletonScope;
kernel.bind<IFilePromise>(TYPES.FILE_PROMISE).to(FilePromise).inSingletonScope;

import {
  IFileStorage,
  LocalStorage,
  HerokuStorage
} from './service/storage';

// //For local testing
// kernel.bind<IFileStorage>(TYPES.FILE_STORAGE).to(LocalStorage);

//For production
kernel.bind<IFileStorage>(TYPES.FILE_STORAGE).to(HerokuStorage);

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
