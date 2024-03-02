import { IMapper } from '../../../shared/infrastructure/contracts';
import { FeedEntity } from '../../domain/entities';
import { TFeedDto } from '../../domain/types';
import { TFeedModelInstance } from '../models';

export class FeedMapper implements IMapper<FeedEntity, TFeedDto> {
  fromEntityToDto(entity: FeedEntity): TFeedDto {
    return {
      uuid: entity.uuid,
      title: entity.title,
      subtitle: entity.subtitle,
      authors: entity.authors.map((item) => item),
      body: entity.body,
      location: entity.location,
      date: entity.date,
      source: {
        code: entity.source.code,
        url: entity.source.url,
      },
    };
  }

  fromInfraToDto(model: TFeedModelInstance): TFeedDto {
    const { uuid, title, subtitle, authors, body, location, date, source } =
      model.toObject();

    return {
      uuid,
      title,
      subtitle,
      authors,
      body,
      location,
      date,
      source,
    };
  }
}
