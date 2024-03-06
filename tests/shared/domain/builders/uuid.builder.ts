import { faker } from '@faker-js/faker';

import { TUuid } from '../../../../src/shared/domain/types';

export class UuidBuilder {
  static random(): TUuid {
    return faker.string.uuid() as TUuid;
  }
}
