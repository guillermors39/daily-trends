import { Request } from 'express';
import Joi from 'joi';

import { TSchemasConfig } from '../../../shared/infrastructure/contracts';
import { BaseController } from '../../../shared/infrastructure/controllers';

export class FeedsSearchController extends BaseController {
  protected schema(): TSchemasConfig {
    return {
      query: Joi.object({
        page: Joi.number().integer().min(1),
        per_page: Joi.number().integer().min(1),
      }),
    };
  }

  protected async run(req: Request): Promise<object[]> {
    const { page, per_page: perPage } = req.query;

    console.log('🚀 ~ FeedsSearchController ~ run ~ page:', page);
    console.log('🚀 ~ FeedsSearchController ~ run ~ perPage:', perPage);

    return [];
  }
}
