import { Request } from 'express';

import { TUuid } from '../../../shared/domain/types';
import { TSchemasConfig } from '../../../shared/infrastructure/contracts';
import { BaseController } from '../../../shared/infrastructure/controllers';
import { FeedDeleteHandler } from '../../application/handlers';
import { params } from '../validations';

export class FeedsDeleteController extends BaseController {
  constructor(private readonly remover: FeedDeleteHandler) {
    super();
  }

  schema(): TSchemasConfig {
    return {
      params: params(),
    };
  }

  async run(req: Request): Promise<void> {
    const uuid = req.params.uuid as TUuid;

    await this.remover.execute(uuid);
  }
}
