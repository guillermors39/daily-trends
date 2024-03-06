import { Request } from 'express';
import Joi from 'joi';

import { TSchemasConfig } from '../../../shared/infrastructure/contracts';
import { BaseController } from '../../../shared/infrastructure/controllers';
import { TrendsSearchHandler } from '../../application/handlers/trends.handler';
import { ESourceCode } from '../../domain/enums';
import { TTrendsFilter } from '../../domain/types';
import { FeedResource } from '../resources/feed.resource';

export class TrendsController extends BaseController {
  constructor(private readonly handler: TrendsSearchHandler) {
    super();
  }

  schema(): TSchemasConfig {
    return {
      query: Joi.object({
        limit: Joi.number().optional().min(1),
        sources: Joi.array().items(
          Joi.string().allow(...Object.values(ESourceCode)),
        ),
      }),
    };
  }

  async run(req: Request): Promise<object> {
    const filters = req.query as TTrendsFilter;

    const entities = await this.handler.execute(filters);

    const resources = entities.map((entity) =>
      new FeedResource(entity).response(),
    );

    return resources;
  }
}
