import { PaginatedDto } from '../../../shared/domain/dtos/paginated.dto';
import {
  BaseJsonResource,
  BasePaginatedResource,
} from '../../../shared/infrastructure/resources';
import { FeedEntity } from '../../domain/entities';

export class FeedResource extends BaseJsonResource {
  constructor(private readonly entity: FeedEntity) {
    super();
  }

  response(): object {
    const dto = this.entity.toPrimitive();

    return {
      uuid: dto.uuid,
      title: dto.title,
      body: dto.body,
      authors: dto.authors,
      location: dto.location,
      source: dto.source,
      date: dto.date.toISOString(),
    };
  }
}

export class FeedPaginatedResource extends BasePaginatedResource {
  constructor(paginated: PaginatedDto<FeedEntity>) {
    super(paginated);
  }

  protected mapItem(item: FeedEntity): object {
    return new FeedResource(item).response();
  }
}
