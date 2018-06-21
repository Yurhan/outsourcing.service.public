import { ILogWriter } from '../interfaces';
import { LogLevel } from '../log-level';

export class NullWriter implements ILogWriter {

  public log(logLevel: LogLevel, messageOrError: string | Error): void {
    //Do nothink
  }
}