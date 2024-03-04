import { randomUUID } from 'crypto';

import { IUuidGenerator } from '../../domain/contracts/app.contract';
import { TUuid } from '../../domain/types';

export class UuidGenerator implements IUuidGenerator {
  execute(): TUuid {
    return randomUUID();
  }
}
