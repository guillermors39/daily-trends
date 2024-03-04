import httpStatus from 'http-status';

import { ClientError } from './client.error';

export class BadRequestError extends ClientError {
  constructor(message: string) {
    super(message, httpStatus.BAD_REQUEST);
  }
}
