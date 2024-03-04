import { Request } from 'express';

import { TUuid } from '../../../shared/domain/types';
import { TSchemasConfig } from '../../../shared/infrastructure/contracts';
import { BaseController } from '../../../shared/infrastructure/controllers';
import { FeedUpdateHandler } from '../../application/handlers';
import { TFeedCreate, TFeedUpdate } from '../../domain/types';
import { FeedResource } from '../resources/feed.resource';
import { body, params } from '../validations';

export class FeedsUpdateController extends BaseController {
  constructor(private readonly updater: FeedUpdateHandler) {
    super();
  }

  protected schema(): TSchemasConfig {
    return {
      body: body(),
      params: params(),
    };
  }

  protected async run(req: Request): Promise<object> {
    const body = req.body as TFeedCreate;
    const uuid = req.params.uuid as TUuid;

    const dto: TFeedUpdate = { uuid, ...body };

    const updated = await this.updater.execute(dto);

    const resource = new FeedResource(updated);

    return resource.response();
  }
}
