import { injectable } from 'inversify';
import { ILogger, ILogWriter } from '../interfaces';
import { LogLevel } from '../log-level';

@injectable()
export class Logger implements ILogger {

  constructor(
    private writer: ILogWriter
  ) {

  }

  public info(message: string): void {
    this.writer.log(LogLevel.Info, message);
  }

  public warn(message: string): void {
    this.writer.log(LogLevel.Warn, message);
  }

  public debug(message: string): void {
    this.writer.log(LogLevel.Debug, message);
  }

  public trace(message: string): void {
    this.writer.log(LogLevel.Trace, message);
  }

  public error(error: Error): void {
    this.writer.log(LogLevel.Error, error);
  }

  public fatal(error: Error): void {
    this.writer.log(LogLevel.Fatal, error);
  }
}