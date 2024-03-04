import { Model } from 'mongoose';

import {
  TPagination,
  TPaginationSearch,
} from '../../domain/contracts/app.contract';
import { PaginatedDto } from '../../domain/dtos/paginated.dto';

type TSort = {
  [key: string]: 1 | -1;
};

type TPaginationParams = TPaginationSearch & {
  filters?: object;
  sort?: TSort;
};

export class PaginatorService {
  async paginate<T>(
    model: Model<T>,
    params: TPaginationParams,
  ): Promise<PaginatedDto<T>> {
    const { page, perPage, filters = {}, sort = {} } = params;

    const skip = (page - 1) * perPage;

    const totalCount = await model.countDocuments();

    const totalPages = Math.ceil(totalCount / perPage);

    const items = await model
      .find(filters)
      .skip(skip)
      .limit(perPage)
      .sort(sort);

    const pagination: TPagination = {
      pages: {
        current: page,
        total: totalPages,
      },
      items: {
        count: items.length,
        total: totalCount,
      },
    };

    return new PaginatedDto(items, pagination);
  }
}
