export interface ILogger {
    info(message: string): void;
    warn(message: string): void;
    debug(message: string): void;
    trace(message: string): void;
    error(error: Error): void;
    fatal(error: Error): void;
}
