import { injectable, inject } from 'inversify'

import {
  ILoggerFactory,
  ILogger,
  ILogWriter,
  ILoggerConfig
} from '../interfaces';
import {
  ConsoleWriter,
  NullWriter,
  Logger,

} from '../implementations';

import * as logWriterTypes from '../log-writer-types';

@injectable()
export class LoggerFactory implements ILoggerFactory {

  constructor(
    @inject(Symbol.for('ILoggerConfig')) private readonly loggerConfig: ILoggerConfig //,
    //private readonly kernel: Kernel
  ) {
  }

  public getLogger(loggerName: string): ILogger {
    let logWriter = this.createWriter(this.loggerConfig, loggerName);
    // if (!this.kernel.isBound(loggerName)) {
    //   this.kernel.bind<ILogger>(loggerName).toConstantValue(new Logger(logWriter));
    // }
    // let logger = this.kernel.get<ILogger>(loggerName);
    let logger = new Logger(logWriter);
    return logger;
  }

  private createWriter(loggerConfig: ILoggerConfig, loggerName: string): ILogWriter {
    switch (loggerConfig.logWriterType) {
      case logWriterTypes.CONSOLE_LOG_WRITER:
        return new ConsoleWriter(loggerName, console);
      case logWriterTypes.NULL_LOG_WRITER:
        return new NullWriter();
    }
    throw new Error(`Unknown LogWriter type ${loggerConfig.logWriterType}`);
  }
}