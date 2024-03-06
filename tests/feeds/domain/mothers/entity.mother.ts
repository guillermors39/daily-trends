import { FeedEntity } from '../../../../src/feeds/domain/entities';
import { ESourceCode } from '../../../../src/feeds/domain/enums';
import { TFeedCreate } from '../../../../src/feeds/domain/types';
import { UuidBuilder } from '../../../shared/domain/builders/uuid.builder';
import {
  FeedCreateMother,
  TFeedCreateFromSourcePartial,
} from './create.mother';

export class FeedEntityMother {
  static create(dto: Partial<TFeedCreate> = {}): FeedEntity {
    const uuid = UuidBuilder.random();

    return FeedEntity.create(uuid, FeedCreateMother.create(dto));
  }

  static createFromSource(dto: TFeedCreateFromSourcePartial = {}): FeedEntity {
    const uuid = UuidBuilder.random();

    return FeedEntity.createFromSource(
      uuid,
      FeedCreateMother.createFromSource(dto),
    );
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
