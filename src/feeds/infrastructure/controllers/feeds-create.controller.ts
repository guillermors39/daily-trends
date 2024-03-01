import { Request, Response } from 'express';
import Joi from 'joi';

import {
  IController,
  TSchemasConfig,
} from '../../../shared/infrastructure/contracts';
import { FeedCreateHandler } from '../../application/handlers';
import { FeedResource } from '../resources/feed.resource';

export class FeedsCreateController implements IController {
  constructor(private readonly creator: FeedCreateHandler) {}

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

  async execute(req: Request, res: Response): Promise<void> {
    const body = req.body;

    const entity = await this.creator.execute(body);

    const resource = new FeedResource(entity);

    res
      .json({
        data: resource.response(),
      })
      .status(200);
  }
}
