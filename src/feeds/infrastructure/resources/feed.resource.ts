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
    return {
      uuid: this.entity.uuid,
      title: this.entity.title,
      subtitle: this.entity.subtitle,
      authors: this.entity.authors,
      source: this.entity.source,
      date: this.entity.date.toISOString(),
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
