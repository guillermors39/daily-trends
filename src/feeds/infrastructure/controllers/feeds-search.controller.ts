import { Request } from 'express';
import Joi from 'joi';

import { TSchemasConfig } from '../../../shared/infrastructure/contracts';
import { BaseController } from '../../../shared/infrastructure/controllers';
import { FeedSearchHandler } from '../../application/handlers';
import { FeedPaginatedResource } from '../resources/feed.resource';

export class FeedsSearchController extends BaseController {
  constructor(private readonly searcher: FeedSearchHandler) {
    super();
  }

  protected schema(): TSchemasConfig {
    return {
      query: Joi.object({
        page: Joi.number().integer().min(1),
        per_page: Joi.number().integer().min(1),
      }),
    };
  }

  protected async run(req: Request): Promise<object> {
    const { page, per_page: perPage } = req.query;

    const paginated = await this.searcher.execute({
      page: !!page ? +page : undefined,
      perPage: !!perPage ? +perPage : undefined,
    });

    const resource = new FeedPaginatedResource(paginated);

    return resource.response();
  }
}
