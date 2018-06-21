import { StatusCode } from '../status-code';
import { RequestError } from './request-error';

export class BadRequestError extends RequestError {
  constructor(message: string) {
    super(message, 'BadRequest', StatusCode.BadRequest);
  }
}