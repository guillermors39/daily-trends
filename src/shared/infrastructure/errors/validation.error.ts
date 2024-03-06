import httpStatus from 'http-status';

import { ClientError } from './client.error';

export class ValidationError extends ClientError {
  constructor(message: string) {
    super(message, httpStatus.UNPROCESSABLE_ENTITY);
  }
}
