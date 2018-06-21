import { LogLevel } from '../log-level';

export interface ILogWriter {
    log(logLevel: LogLevel, messageOrError: string | Error): void;
}
