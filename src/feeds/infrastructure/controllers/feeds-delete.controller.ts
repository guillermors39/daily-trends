import { TSchemasConfig } from '../../../shared/infrastructure/contracts';
import { BaseController } from '../../../shared/infrastructure/controllers';
import { params } from '../validations';

export class FeedsDeleteController extends BaseController {
  schema(): TSchemasConfig {
    return {
      params: params(),
    };
  }

  async run(): Promise<void> {}
}
