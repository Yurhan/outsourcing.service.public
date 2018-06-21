import { injectable, inject } from 'inversify';
import { IConfig } from '../../config';
import { ILoggerConfig } from '../interfaces';

@injectable()
export class LoggerConfig implements ILoggerConfig {

  public readonly logWriterType: string;

  constructor(
    @inject(Symbol.for('IConfig')) config: IConfig
  ) {
    let loggerConfig = config.get<ILoggerConfig>('loggerConfig');

    this.logWriterType = loggerConfig.logWriterType;
  }
}
