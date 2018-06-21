import { StatusCode } from '../status-code';
import { RequestError } from './request-error';

export class ForbiddenError extends RequestError {
  constructor(message: string) {
    super(message, 'Forbidden', StatusCode.Forbidden);
  }
}