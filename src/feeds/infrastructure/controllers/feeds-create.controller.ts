import { Request, Response } from 'express';
import httpStatus from 'http-status';

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

  schema(): TSchemasConfig {
    return {
      body: body(),
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
