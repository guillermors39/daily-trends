import { TUuid } from '../../../shared/domain/types';
import { FeedEntity } from '../entities';

export interface IFeedCreateRepository {
  create(feed: FeedEntity): Promise<void>;
}

export interface IFeedFindRepository {
  find(uuid: TUuid): Promise<FeedEntity | null>;
}

export interface IFeedUpdateRepository {
  update(feed: FeedEntity): Promise<void>;
}
