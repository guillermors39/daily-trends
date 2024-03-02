import { NextFunction, Request, Response } from 'express';

import { NotFoundException } from '../../application/exceptions';
import { TSchemasConfig } from '../contracts';
import { NotFoundError } from '../errors/not-found.error';
import { validateRequest } from '../helpers/request';

export abstract class BaseController {
  abstract run(req: Request, res: Response): Promise<void>;

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

      await this.run(req, res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        return next(new NotFoundError(error.message));
      }

      next(error);
    }
  }
}
