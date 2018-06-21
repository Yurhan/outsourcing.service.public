import { StatusCode } from '../status-code';
import { RequestError } from './request-error';

export class UnauthorizedError extends RequestError {
  constructor(message: string) {
    super(message, 'Unauthorized', StatusCode.Unauthorized);
  }
}