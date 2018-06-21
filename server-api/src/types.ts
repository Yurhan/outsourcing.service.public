export const CONFIG = Symbol.for('IConfig');
export const LOGGER_FACTORY = Symbol.for('ILoggerFactory');
export const LOGGER_CONFIG = Symbol.for('ILoggerConfig');
export const SHA_CRYPTO_PROVIDER = Symbol.for('ISHACryptoProvider');
export const FAST_SHA256 = Symbol.for('IFastSHA256');

export const UNIT_OF_WORK = Symbol.for('IUnitOfWork');
export const DB_CONNECTION = Symbol.for('IDbConnection');
export const TRANSACTION_PROVIDER = Symbol.for('ITransactionProvider');
export const QUERY_PROVIDER = Symbol.for('IQueryProvider');

export const DOCTOR_DATA_ACCESS = Symbol.for('IDataAccess<IDoctor>');
export const TIMER_DATA_ACCESS = Symbol.for('IDataAccess<ITimer>');
export const PATIENT_TIME_INTERVAL_DATA_ACCESS = Symbol.for('IDataAccess<IPatientTimerInterval>');
export const PATIENT_DATA_ACCESS = Symbol.for('IDataAccess<IPatient>');
export const PATIENT_TAG_DATA_ACCESS = Symbol.for('IDataAccess<IPatientTag>');
export const USER_DATA_ACCESS = Symbol.for('IDataAccess<IUser>');
export const STAFF_DATA_ACCESS = Symbol.for('IDataAccess<IStaff>');
export const NOTE_DATA_ACCESS = Symbol.for('IDataAccess<INote>');
export const STAFF_LOG_DATA_ACCESS = Symbol.for('IDataAccess<ILog>');
export const CALL_DATA_ACCESS = Symbol.for('IDataAccess<ICall>');
export const PATIENT_PHONE_DATA_ACCESS = Symbol.for('IDataAccess<IPatientPhone>');

export const DOCTOR_SERVICE = Symbol.for('IDoctorService');
export const TIMER_SERVICE = Symbol.for('ITimerService');
export const PATIENT_SERVICE = Symbol.for('IPatientService');
export const PATIENT_PHONE_SERVICE = Symbol.for('IPatientPhoneService');
export const PATIENT_TAG_SERVICE = Symbol.for('IPatientTagService');
export const USER_SERVICE = Symbol.for('IUserService');
export const STAFF_SERVICE = Symbol.for('IStaffService');
export const NOTE_SERVICE = Symbol.for('INoteService');
export const STAFF_LOG_SERVICE = Symbol.for('IStaffLogService');
export const LOG_BUILDER = Symbol.for('ILogBuilder');
export const STATISTIC_SERVICE = Symbol.for('IStatisticService');
export const CURRENT_USER_SERVICE = Symbol.for('ICurrentUserService');


export const TWILIO_CLIENT_CAPABILITY = Symbol.for('ClientCapability');
export const TWILIO_OUTGOINT_CLIENT_SCOPE = Symbol.for('OutgoingClientScope');
export const TWILIO_SERVICE = Symbol.for('ITwilioService');

export const CACHE = Symbol.for('ICache');

export const MOCK_USER = Symbol.for('IMockUser');

export const USER_CONTEXT = Symbol.for('IUserContext');
export const CALL_SERVICE = Symbol.for('ICallService');

export const CALL_FILTER_VALIDATOR = Symbol.for('IFilterModelValidator<ICallFilter>');
export const STAFF_LOG_FILTER_VALIDATOR = Symbol.for('IFilterModelValidator<IStaffLogFilter>');

export const NOTE_MODEL_VALIDATOR = Symbol.for('IDataModelValidator<INote>');
export const PATIENT_AVAILABILITY_VALIDATOR = Symbol.for('IDataModelValidator<IPatientAvailability>');