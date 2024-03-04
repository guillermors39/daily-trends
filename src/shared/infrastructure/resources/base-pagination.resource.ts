import { PaginatedDto } from '../../domain/dtos/paginated.dto';
import { BaseJsonResource } from './base-json.resource';

export abstract class BasePaginatedResource<
  T extends object = object,
> extends BaseJsonResource {
  constructor(protected readonly paginated: PaginatedDto<T>) {
    super();
  }

  protected abstract mapItem(item: T): object;

  response(): object {
    const { items, pagination } = this.paginated;

    return {
      items: items.map(this.mapItem),
      meta: {
        pages: {
          current: pagination.pages.current,
          total: pagination.pages.total,
        },
        items: {
          count: pagination.items.count,
          total: pagination.items.total,
        },
      },
    };
  }
}
