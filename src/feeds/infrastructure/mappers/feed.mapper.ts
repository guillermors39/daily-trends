import { IMapper } from '../../../shared/infrastructure/contracts';
import { FeedEntity } from '../../domain/entities';
import { TFeedDto } from '../../domain/types';
import { TFeedModelInstance } from '../models';

export class FeedMapper implements IMapper<FeedEntity, TFeedDto> {
  fromEntityToDto(entity: FeedEntity): TFeedDto;
  fromEntityToDto(entity: FeedEntity[]): TFeedDto[];
  fromEntityToDto(entity: FeedEntity | FeedEntity[]): TFeedDto | TFeedDto[] {
    const mapItem = (entity: FeedEntity) => entity.toPrimitive();

    return Array.isArray(entity) ? entity.map(mapItem) : mapItem(entity);
  }

  fromInfraToDto(model: TFeedModelInstance): TFeedDto;
  fromInfraToDto(model: TFeedModelInstance[]): TFeedDto[];
  fromInfraToDto(
    model: TFeedModelInstance | TFeedModelInstance[],
  ): TFeedDto | TFeedDto[] {
    const mapItem = (model: TFeedModelInstance) => {
      const { uuid, title, authors, body, location, date, source } =
        model.toObject();

      return {
        uuid,
        title,
        authors,
        body,
        location,
        date,
        source,
      };
    };

    return Array.isArray(model) ? model.map(mapItem) : mapItem(model);
  }
}
