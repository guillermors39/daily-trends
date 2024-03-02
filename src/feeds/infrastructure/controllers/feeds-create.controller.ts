import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

import { TSchemasConfig } from '../../../shared/infrastructure/contracts';
import { BaseController } from '../../../shared/infrastructure/controllers';
import { FeedCreateHandler } from '../../application/handlers';
import { TFeedCreate } from '../../domain/types';
import { FeedResource } from '../resources/feed.resource';

export class FeedsCreateController extends BaseController {
  constructor(private readonly creator: FeedCreateHandler) {
    super();
  }

  schema(): TSchemasConfig {
    return {
      body: Joi.object({
        title: Joi.string().required(),
        subtitle: Joi.string().required(),
        body: Joi.string().required(),
        date: Joi.date().required(),
        authors: Joi.array().items(Joi.string()).required().min(1),
        location: Joi.string().required(),
      }),
    };
  }

  async run(req: Request, res: Response): Promise<void> {
    const body = req.body as TFeedCreate;

    const entity = await this.creator.execute(body);

    const resource = new FeedResource(entity);

    res
      .json({
        data: resource.response(),
      })
      .status(httpStatus.OK);
  }
}
