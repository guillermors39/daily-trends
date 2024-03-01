import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

import {
  IController,
  TSchemasConfig,
} from '../../../shared/infrastructure/contracts';

export class FeedsFindController implements IController {
  schema(): TSchemasConfig {
    return {
      params: Joi.object({
        uuid: Joi.string().uuid().required(),
      }),
    };
  }

  async execute(req: Request, res: Response): Promise<void> {
    const uuid = req.params.uuid;

    res
      .json({
        data: null,
      })
      .status(httpStatus.OK);
  }
}
