import { WSAETOOMANYREFS } from "constants";

export const CONFIG = Symbol.for('IConfig');
export const LOGGER_FACTORY = Symbol.for('ILoggerFactory');
export const LOGGER_CONFIG = Symbol.for('ILoggerConfig');
export const SHA_CRYPTO_PROVIDER = Symbol.for('ISHACryptoProvider');
export const FAST_SHA256 = Symbol.for('IFastSHA256');
export const FILE_PROMISE = Symbol.for('IFilePromise');

export const UNIT_OF_WORK = Symbol.for('IUnitOfWork');
export const DB_CONNECTION = Symbol.for('IDbConnection');
export const TRANSACTION_PROVIDER = Symbol.for('ITransactionProvider');
export const QUERY_PROVIDER = Symbol.for('IQueryableProvider');
export const SQL_DATA_DRIVER = Symbol.for('ISqlDataDriver');

// SERVICES
export const USER_SERVICE = Symbol.for('IUserService');
export const COMPANY_INFO_SERVICE = Symbol.for('IDataService<ICompanyInfo>');
export const COMPANY_PARTNER_SERVICE = Symbol.for('IDataService<ICompanyPartner>');
export const COMPANY_SERVICES_SERVICE = Symbol.for('IDataService<ICompanyServices>');
export const JOB_VACANSY_SERVICE = Symbol.for('IDataService<IJobVacancy>');
export const CONTACT_SERVICE = Symbol.for('IDataService<IContact>');
export const PICTURE_SERVICE = Symbol.for('IPictureService');

// BUILDERS
export const COMPANY_INFO_QUERY_BUILDER = Symbol.for('ISqlTableQueryBuilder<ICompanyInfo>');
export const COMPANY_PARTNER_QUERY_BUILDER = Symbol.for('ISqlTableQueryBuilder<ICompanyPartner>');
export const COMPANY_SERVICES_QUERY_BUILDER = Symbol.for('ISqlTableQueryBuilder<ICompanyServices>');
export const JOB_VACANCY_QUERY_BUILDER = Symbol.for('ISqlTableQueryBuilder<IJobVacancy>');
export const CONTACT_QUERY_BUILDER = Symbol.for('ISqlTableQueryBuilder<IContact>');
export const USER_QUERY_BUILDER = Symbol.for('ISqlUserQueryBuilder');
export const QUERY_VALUE_ESCAPER = Symbol.for('IQueryValueEscaper');

//VALIDATOR
export const COMPANY_INFO_VALIDATOR = Symbol.for('IBaseTableModelValidator<ICompanyInfo>');
export const COMPANY_PARTNER_VALIDATOR = Symbol.for('IBaseTableModelValidator<ICompanyPartner>');
export const COMPANY_SERVICES_VALIDATOR = Symbol.for('IBaseTableModelValidator<ICompanyServices>');
export const JOB_VACANCY_VALIDATOR = Symbol.for('IBaseTableModelValidator<IJobVacancy>');
export const CONTACT_VALIDATOR = Symbol.for('IBaseTableModelValidator<IContact>');
// export const COMPANY_INFO_VALIDATOR = Symbol.for('IBaseTableModelValidator<ICompanyInfo>');

export const LOG_BUILDER = Symbol.for('ILogBuilder');

export const CACHE = Symbol.for('ICache');

export const MOCK_USER = Symbol.for('IMockUser');
export const USER_CONTEXT = Symbol.for('IUserContext');