import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { TUuid } from '../../../shared/domain/types';
import { TSchemasConfig } from '../../../shared/infrastructure/contracts';
import { BaseController } from '../../../shared/infrastructure/controllers';
import { FeedFindHandler } from '../../application/handlers';
import { FeedResource } from '../resources/feed.resource';
import { params } from '../validations';

export class FeedsFindController extends BaseController {
  constructor(private readonly finder: FeedFindHandler) {
    super();
  }

  schema(): TSchemasConfig {
    return {
      params: params(),
    };
  }

  async run(req: Request, res: Response): Promise<void> {
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
