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
      body: this.entity.body,
      authors: this.entity.authors,
      location: this.entity.location,
      source: {
        code: this.entity.source.code,
        url: this.entity.source.url,
      },
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
