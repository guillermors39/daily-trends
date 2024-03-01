import { IMapper } from '../../../shared/infrastructure/contracts';
import { FeedEntity } from '../../domain/entities';
import { TFeedModelDto, TFeedModelInstance } from '../models';

export class FeedMapper implements IMapper<FeedEntity, TFeedModelDto> {
  fromEntityToInfraDto(entity: FeedEntity): TFeedModelDto {
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

  fromInfraToDto(model: TFeedModelInstance): TFeedModelDto {
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
