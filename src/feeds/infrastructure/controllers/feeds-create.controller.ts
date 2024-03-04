import { Request } from 'express';

import { TSchemasConfig } from '../../../shared/infrastructure/contracts';
import { BaseController } from '../../../shared/infrastructure/controllers';
import { FeedCreateHandler } from '../../application/handlers';
import { TFeedCreate } from '../../domain/types';
import { FeedResource } from '../resources/feed.resource';
import { body } from '../validations';

export class FeedsCreateController extends BaseController {
  constructor(private readonly creator: FeedCreateHandler) {
    super();
  }

  protected schema(): TSchemasConfig {
    return {
      body: body(),
    };
  }

  protected async run(req: Request): Promise<object> {
    const body = req.body as TFeedCreate;

    const entity = await this.creator.execute(body);

    const resource = new FeedResource(entity);

    return resource.response();
  }
}
