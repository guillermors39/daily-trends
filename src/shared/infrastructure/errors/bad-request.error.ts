import httpStatus from 'http-status';

import { ClientError } from './client.error';

export class BadRequestError extends ClientError {
  constructor({ message }: { message: string }) {
    super({ message, statusCode: httpStatus.BAD_REQUEST });
  }
}
