import { faker } from '@faker-js/faker';

import { FeedEntity } from '../../../../src/feeds/domain/entities';
import { ESourceCode } from '../../../../src/feeds/domain/enums';
import { TFeedCreate, TFeedDto } from '../../../../src/feeds/domain/types';
import { SourceCode } from '../../../../src/feeds/domain/valueObjects/feed.vo';
import { UuidBuilder } from '../../../shared/domain/builders/uuid.builder';
import {
  FeedCreateMother,
  TFeedCreateFromSourcePartial,
} from './create.mother';

export class FeedEntityMother {
  static createFromLocal(dto: Partial<TFeedDto> = {}): FeedEntity {
    const { uuid = UuidBuilder.random() } = dto;

    return FeedEntity.create(uuid, FeedCreateMother.create(dto));
  }

  private static createFromSource(
    dto: TFeedCreateFromSourcePartial = {},
  ): FeedEntity {
    const uuid = UuidBuilder.random();

    return FeedEntity.createFromSource(
      uuid,
      FeedCreateMother.createFromSource(dto),
    );
  }

  static createFromExternal(dto: Partial<TFeedCreate> = {}): FeedEntity {
    const externals = SourceCode.availables.filter(
      (item) => item !== ESourceCode.local,
    );

    const fromSourceDto = {
      ...dto,
      source: {
        code: faker.helpers.arrayElement(externals),
      },
    };

    return this.createFromSource(fromSourceDto);
  }

  static createFromElPais(dto: Partial<TFeedCreate> = {}): FeedEntity {
    const fromSourceDto = {
      ...dto,
      source: {
        code: ESourceCode.elPais,
      },
    };

    return this.createFromSource(fromSourceDto);
  }

  static createFromElMundo(dto: Partial<TFeedCreate> = {}): FeedEntity {
    const fromSourceDto = {
      ...dto,
      source: {
        code: ESourceCode.elMundo,
      },
    };

    return this.createFromSource(fromSourceDto);
  }
}
