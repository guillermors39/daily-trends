import { PaginatedDto } from '../../../shared/domain/dtos/paginated.dto';
import { TUuid } from '../../../shared/domain/types';
import { FeedEntity } from '../entities';
import { TPaginationParams } from './services.contract';

export interface IFeedCreateRepository {
  create(feed: FeedEntity): Promise<void>;
}

export interface IFeedFindRepository {
  find(uuid: TUuid): Promise<FeedEntity | null>;
}

export interface IFeedUpdateRepository {
  update(feed: FeedEntity): Promise<void>;
}

export interface IFeedDeleteRepository {
  delete(uuid: TUuid): Promise<void>;
}

export interface IFeedSearchRepository {
  search(params: TPaginationParams): Promise<PaginatedDto<FeedEntity>>;
}
