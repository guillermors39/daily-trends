import { TPagination } from '../contracts/app.contract';

export class PaginatedDto<T> {
  constructor(
    private readonly _items: T[],
    private readonly _pagination: TPagination,
  ) {}

  get items(): T[] {
    return this._items;
  }

  get pagination(): TPagination {
    return this._pagination;
  }
}
