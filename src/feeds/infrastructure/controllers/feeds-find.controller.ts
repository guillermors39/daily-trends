import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

import { TUuid } from '../../../shared/domain/types';
import {
  IController,
  TSchemasConfig,
} from '../../../shared/infrastructure/contracts';
import { FeedFindHandler } from '../../application/handlers';
import { FeedResource } from '../resources/feed.resource';

export class FeedsFindController implements IController {
  constructor(private readonly finder: FeedFindHandler) {}

  schema(): TSchemasConfig {
    return {
      params: Joi.object({
        uuid: Joi.string().uuid().required(),
      }),
    };
  }

  async execute(req: Request, res: Response): Promise<void> {
    const uuid = req.params.uuid as TUuid;

    const entity = await this.finder.execute(uuid);

    const resource = new FeedResource(entity);

    res
      .json({
        data: resource.response(),
      })
      .status(httpStatus.OK);
  }
}
