import { HydratedDocument, Model } from 'mongoose';

import { TPaginationSearch } from '../../domain/contracts/app.contract';
import { PaginatedDto } from '../../domain/dtos/paginated.dto';

type TSort = {
  [key: string]: 1 | -1;
};

export type TPaginationParams = TPaginationSearch & {
  filters?: object;
  sort?: TSort;
};

export interface IPaginatorService {
  paginate<T>(
    model: Model<T>,
    params: TPaginationParams,
  ): Promise<PaginatedDto<HydratedDocument<T>>>;
}

export interface IConnector {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
