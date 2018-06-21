import { StatusCode } from '../status-code';

export class ConfigError extends Error {
  public statusCode: number;

  constructor(message: string, name: string, statusCode?: StatusCode) {
    super();
    this.statusCode = statusCode || StatusCode.ServerError;
    this.name = name;
    this.message = message;
  }
}
