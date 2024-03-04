import { Request } from 'express';

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

  protected schema(): TSchemasConfig {
    return {
      params: params(),
    };
  }

  protected async run(req: Request): Promise<object> {
    const uuid = req.params.uuid as TUuid;

    const entity = await this.finder.execute(uuid);

    const resource = new FeedResource(entity);

    return resource.response();
  }
}
