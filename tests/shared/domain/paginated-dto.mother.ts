import { TPagination } from '../../../src/shared/domain/contracts/app.contract';
import { PaginatedDto } from '../../../src/shared/domain/dtos/paginated.dto';

export class PaginatedDtoMother {
  static create<T extends object>(
    items: T[] = [],
    pagination: Partial<TPagination> = {},
  ): PaginatedDto<T> {
    const {
      pages: { current: currentPage = 1, total: totalPage = 10 } = {
        current: undefined,
        total: undefined,
      },
      items: { count = 10, total: totalItems = 100 } = {
        count: undefined,
        total: undefined,
      },
    } = pagination;

    return new PaginatedDto(items, {
      pages: {
        current: currentPage,
        total: totalPage,
      },
      items: {
        count,
        total: totalItems,
      },
    });
  }
}
