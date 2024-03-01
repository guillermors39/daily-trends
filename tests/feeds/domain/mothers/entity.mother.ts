import { faker } from '@faker-js/faker';

import { FeedEntity } from '../../../../src/feeds/domain/entities';
import { TFeedCreate } from '../../../../src/feeds/domain/types';
import { TUuid } from '../../../../src/shared/domain/types';
import { FeedCreateMother } from './create.mother';

export class FeedEntityMother {
  static create(dto: Partial<TFeedCreate> = {}): FeedEntity {
    const uuid = faker.string.uuid() as TUuid;

    return FeedEntity.create(uuid, FeedCreateMother.create(dto));
  }
}
