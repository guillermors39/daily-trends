import httpStatus from 'http-status';

import { ClientError } from './client.error';

export class NotFoundError extends ClientError {
  constructor(message: string) {
    super(message, httpStatus.NOT_FOUND);
  }
}
