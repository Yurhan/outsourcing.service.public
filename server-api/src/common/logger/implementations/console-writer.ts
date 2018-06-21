import { ILogWriter } from '../interfaces';
import { LogLevel } from '../log-level';


export class ConsoleWriter implements ILogWriter {

  private logHadlers: { [logLevel: number]: (messageOrError: string | Error) => void; };

  constructor(
    private name: string,
    private console: Console
  ) {
    this.initLogHandlers();
  }

  public log(logLevel: LogLevel, messageOrError: string | Error): void {
    let level = logLevel.valueOf();
    let logHadler = this.logHadlers[level];
    if (!logHadler) {
      throw new Error(`Unknown log level! ${logLevel}`);
    }
    logHadler(messageOrError);
  }

  private initLogHandlers() {
    this.logHadlers = {};
    this.logHadlers[LogLevel.Info] = console.info;
    this.logHadlers[LogLevel.Warn] = console.warn;
    this.logHadlers[LogLevel.Trace] = console.trace;
    this.logHadlers[LogLevel.Error] = console.error;
    this.logHadlers[LogLevel.Fatal] = console.error;
  }
}
