import { StatusCode } from '../status-code';
import { RequestError } from './request-error';

export class NotFoundError extends RequestError {
  constructor(message: string) {
    super(message, 'NotFound', StatusCode.NotFound);
  }
}