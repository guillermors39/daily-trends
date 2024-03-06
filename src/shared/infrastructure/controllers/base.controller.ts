import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import {
  NotFoundException,
  ValidationException,
} from '../../domain/exceptions';
import { TSchemasConfig } from '../contracts';
import { NotFoundError, ValidationError } from '../errors';
import { validateRequest } from '../helpers/request';

export abstract class BaseController {
  protected abstract run(req: Request): Promise<object | void>;

  protected schema(): TSchemasConfig {
    return {};
  }

  async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await validateRequest(this.schema(), req);

      const data = await this.run(req);

      const statusCode =
        typeof data === 'object' ? httpStatus.OK : httpStatus.NO_CONTENT;

      res.status(statusCode).json({ data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // TODO: make a error factory
      if (error instanceof NotFoundException) {
        return next(new NotFoundError(error.message));
      }

      if (error instanceof ValidationException) {
        return next(new ValidationError(error.message));
      }

      next(error);
    }
  }
}
