import { HydratedDocument, Model } from 'mongoose';

import { TPaginationParams } from '../../../feeds/domain/contracts';
import { PaginatedDto } from '../../domain/dtos/paginated.dto';

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
