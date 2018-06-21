import { ILogger } from './logger';

interface ILoggerFactory {
    getLogger(loggerType: string): ILogger;
}
